const favMoviesFromLocalStorage = JSON.parse(localStorage.getItem("favMovies"));

export const favMoviesLS = favMoviesFromLocalStorage || [];
