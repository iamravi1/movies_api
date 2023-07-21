const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

const API_KEY = "api_key=de5ea25dccaf1a01e8293b9034f465d1";
const Base_url = "https://api.themoviedb.org/3";
const img_url = "https://image.tmdb.org/t/p/w500";

app.use(cors());

// Middleware to parse JSON data from POST request body
app.use(express.json());

// Function to fetch popular movies
async function fetchMovies() {
  try {
    const response = await axios.get(`${Base_url}/discover/movie?sort_by=popularity.desc&${API_KEY}`);
    const movies = response.data.results;
    return movies;
  } catch (error) {
    throw new Error("Error fetching popular movies:", error.message);
  }
}

// Function to fetch movie details using the provided search term
async function fetchMovieDetails(searchTerm) {
  try {
    const response = await axios.get(`${Base_url}/search/movie?query=${searchTerm}&${API_KEY}`);
    const movies = response.data.results;
    return movies;
  } catch (error) {
    throw new Error("Error fetching movie details:", error.message);
  }
}

// Route to handle GET request for all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await fetchMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle POST request for movie search
app.post('/movies', async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    if (!searchTerm) {
      return res.status(400).json({ error: "Movie name is required in the request body." });
    }

    const movies = await fetchMovieDetails(searchTerm);

    if (movies.length === 0) {
      return res.status(404).json({ error: "No movies found with the specified search term." });
    }

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
