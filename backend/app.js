require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const natural = require("natural");

const app = express();
app.use(express.json());
app.use(cors());

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let spotifyToken = "";

// Function to get Spotify access token
async function getSpotifyToken() {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
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
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(text);
  return words.join(" "); // Return processed text
}

// API Route to get recommended songs
app.post("/recommend", async (req, res) => {
  const { situation } = req.body;
  if (!situation) return res.status(400).json({ error: "Situation is required" });

  const processedQuery = extractKeywords(situation); // Extract keywords
  console.log("Processed query:", processedQuery);
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        processedQuery
      )}&type=track&limit=10`,
      {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      }
    );

    const songs = response.data.tracks.items.map((track) => ({
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      url: track.external_urls.spotify,
    }));

    res.json({ songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Failed to get songs" });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
