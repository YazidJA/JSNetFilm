//3. Add pagination
//4. Hide API

// Declare DOM elements
const container = document.getElementById("main");
const form = document.getElementById("form");
const searchBar = document.getElementById("search");

// API parameter
const key = "06dfec9e48a69561a88a99e127c101f8";
const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${key}`;
const config = {
  headers: { Accept: "application/json" },
};

// Fetch Function
const generateMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  mapMovies(data.results);
  console.log(data.results);
};

// Map
const mapMovies = (arr) => {
  container.innerHTML = arr
    .map((i) => {
      const color = colorFunction(i.vote_average);
      return `
      <div class="movie">
      <a href="https://www.themoviedb.org/movie/${i.id}"><img src= "https://image.tmdb.org/t/p/w1280${i.poster_path}" alt="" /></a>
    <div class="movie-info">
      <h3>${i.original_title}</h3>
      <span class="${color}">${i.vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${i.overview}
    </div>
    </div>`;
    })
    .join("");
};

// Rating Color Function
const colorFunction = (rating) => {
  if (rating > 7) {
    return "green";
  } else if (rating > 5) {
    return "orange";
  } else {
    return "red";
  }
};

// Initialize Page
generateMovies(popularURL);

// Search functionality
searchBar.addEventListener("input", (e) => {
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchTerm}`;
    generateMovies(searchURL);
  } else {
    generateMovies(popularURL);
  }
});
