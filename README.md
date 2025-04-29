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
	•	Frontend: React.js (or Vue.js alternative)
	•	Backend: Node.js, Express
	•	APIs:
	•	Spotify Web API (for music search and streaming)
	•	Genius API (for lyrics fetching)
	•	NLP Libraries: Natural.js (tokenizer, stopword removal, stemming)
	•	Styling: TailwindCSS

⸻

Features
	•	🎵 Search and play Spotify songs based on natural language input
	•	🧠 Keyword extraction using NLP techniques
	•	🎤 View lyrics through Genius API integration
	•	📚 Save your favorite songs to a personal library
	•	🎛️ Retro-themed, glowing UI with subtle grid backgrounds
	•	🔒 Secure API authentication handling

⸻

Installation

### 1. Clone the repository

git clone https://github.com/your-username/prompttunes.git
cd prompttunes

2. Install dependencies

For both frontend and backend:

npm install

3. Run the application

Start backend server:

node app.js

Start frontend server:

npm run dev



⸻

Environment Variables

Create a .env file in your root directory and add:

SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
GENIUS_ACCESS_TOKEN=your_genius_access_token



⸻

Project Structure

/frontend
  ├── App.jsx
  ├── /components
      └── Sidebar.jsx
  ├── /pages
      ├── Home.jsx
      ├── Library.jsx
      ├── Search.jsx
/backend
  └── app.js



⸻

Screenshots


