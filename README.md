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
- **Frontend**: React.js 

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

1.![129B4549-75DD-4B60-9B08-3529819B5D49_1_201_a](https://github.com/user-attachments/assets/aa9f325c-9ffc-4a62-9432-2fda89c4f138)
2.![E24AD798-8C3A-4617-80F6-963F997C8400_1_201_a](https://github.com/user-attachments/assets/cd147afd-76f1-47a2-96f7-716d5d8382c5)
3.![30E96079-D4C1-4E3D-A6EE-706481E93FE7_1_201_a](https://github.com/user-attachments/assets/543e8351-fed8-42aa-a8ac-790246f3ee5e)






