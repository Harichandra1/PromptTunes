<h1 align="center">PromptTunes 🎵</h1>

>*A retro-themed music web app that plays Spotify songs based on natural language input.*

Table of Contents
	•	About the Project
	•	Tech Stack
	•	Features
	•	Installation
	•	Environment Variables
	•	Project Structure
	•	Screenshots


⸻

## About the Project

PromptTunes allows users to simply type a situation, mood, or phrase — and instantly discover Spotify tracks that match the vibe.
It processes user input using Natural Language Processing (NLP), extracts keywords, and fetches relevant songs through the Spotify API.

The application features a retro-styled interface with additional functionality to save favorite songs and view lyrics powered by the Genius API.

⸻

Tech Stack 
- **Frontend**: React.js (or Vue.js alternative)

- **Backend**: Node.js, Express

- **APIs**:
  - Spotify Web API
  - Genius API

- **NLP Libraries**: Natural.js

- **Styling**: TailwindCSS

⸻

## Features

- 🎵 Search and play Spotify songs based on natural language input
- 🧠 Keyword extraction using NLP techniques
- 🎤 View lyrics through Genius API integration
- 📚 Save your favorite songs to a personal library
- 🎛️ Retro-themed, glowing UI with subtle grid backgrounds
- 🔒 Secure API authentication handling
  
⸻

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Harichandra1/PromptTunes.git
cd prompttunes
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the application
```bash
# Start backend server
node app.js

# Start frontend server
npm run dev
```

## Environment Variables

Create a `.env` file in your root directory with the following variables:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
GENIUS_ACCESS_TOKEN=your_genius_access_token
```

## API Usage Examples

### Spotify API
```javascript
// Example of fetching tracks from Spotify
async function searchTracks(query) {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  return await response.json();
}
```

### Genius API
```javascript
// Example of fetching lyrics from Genius
async function fetchLyrics(songId) {
  const response = await fetch(`https://api.genius.com/songs/${songId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`
    }
  });
  return await response.json();
}
⸻
```

## Project Structure

```
/frontend
├── App.jsx
├── /components
│   └── Sidebar.jsx
├── /pages
│   ├── Home.jsx
│   ├── Library.jsx
│   └── Search.jsx
/backend
└── app.js
```


⸻

Screenshots


