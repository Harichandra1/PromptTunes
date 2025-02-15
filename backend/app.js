require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const natural = require("natural");

const app = express();
app.use(express.json());
app.use(cors());

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const stopWords = new Set(["the", "is", "and", "a", "to", "of", "in", "for", "on", "with", "as", "at", "by", "an", "be", "this", "that"]);

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;

let spotifyToken = "";

// Function to get Spotify access token
async function getSpotifyToken() {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    spotifyToken = response.data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
  }
}

// Call function to get token at server start
getSpotifyToken();

// NLP function to process input and find keywords
function extractKeywords(text) {
  let words = tokenizer.tokenize(text.toLowerCase());
  let filteredWords = words.filter(word => !stopWords.has(word)).map(word => stemmer.stem(word));
  return filteredWords.join(" ");
}

// Function to get song lyrics from Genius API
async function getLyrics(trackName, artistName) {
  try {
    const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(trackName + " " + artistName)}`;
    const searchResponse = await axios.get(searchUrl, {
      headers: { Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}` },
    });

    const hits = searchResponse.data.response.hits;
    if (hits.length === 0) return "Lyrics not found";

    const songUrl = hits[0].result.url; // Genius provides lyrics via webpage
    return `Lyrics available at: ${songUrl}`;
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return "Lyrics not available";
  }
}

// API Route to get recommended songs and analyze lyrics
app.post("/recommend", async (req, res) => {
  const { situation } = req.body;
  if (!situation) return res.status(400).json({ error: "Situation is required" });

  const processedQuery = extractKeywords(situation); // Extract keywords

  try {
    // Get song recommendations from Spotify
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(processedQuery)}&type=track&limit=5`,
      {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      }
    );

    let songs = response.data.tracks.items.map(track => ({
      name: track.name,
      artist: track.artists.map(a => a.name).join(", "),
      url: track.external_urls.spotify,
    }));

    // Fetch Genius lyrics link for each song
    for (let song of songs) {
      song.lyrics = await getLyrics(song.name, song.artist);
    }

    res.json({ songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Failed to get songs" });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
