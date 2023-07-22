const img_url = "https://image.tmdb.org//t/p/w500";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Function to fetch movies using the provided search term (POST request)
async function fetchMoviesBySearch(searchTerm) {
  try {
    const response = await fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm }),
    });

    const data = await response.json();
    showsearchmovies(data);
    console.log(data)
  } catch (error) {
    console.error('Error fetching movies:', error);
    // Handle error, show a message, or take appropriate action based on your app's requirements.
  }
}

async function showsearchmovies(data) {
  try {
    main.innerHTML = '';
    data.forEach(movie => {
      const { original_title, poster_path, vote_average, overview } = movie;
      const movieel = document.createElement('div');
      movieel.classList.add('movie');
      movieel.innerHTML = `
        <img src="${img_url + poster_path}" alt="${original_title}">
        <div class="movie-info">
          <h3>${original_title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `;

      main.appendChild(movieel);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    // Handle error, show a message, or take appropriate action based on your app's requirements.
  }
}


async function showmovies() {
  try {
    const response = await fetch('http://localhost:3000/movies');
    const data = await response.json();
    // console.log(data)

    main.innerHTML = '';
    data.forEach(movie => {
      const { original_title, poster_path, vote_average, overview } = movie;
      const movieel = document.createElement('div');
      movieel.classList.add('movie');
      movieel.innerHTML = `
        <img src="${img_url + poster_path}" alt="${original_title}">
        <div class="movie-info">
          <h3>${original_title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `;

      main.appendChild(movieel);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    // Handle error, show a message, or take appropriate action based on your app's requirements.
  }
}

showmovies();

function getColor(vote){
    if(vote>=8){
        return 'green';
    }
    else if(vote>=5){
        return "orange";
    }
    else{
        return "red";
    }
}

// Function to add click event listener to the "Movies" button
function addMoviesButtonListener() {
  const moviesButton = document.getElementById('moviesButton');
  moviesButton.addEventListener('click', () => {
    // Call the function to fetch popular movies (GET request)
    showmovies();
  });
}

// Call the function to add click event listener to the "Movies" button
addMoviesButtonListener();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (searchTerm) {
    fetchMoviesBySearch(searchTerm);
  }
  else {
    showmovies();
  }
});
