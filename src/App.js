import "./App.css";
import React from "react";
import { SearchComp } from "./components/SearchComp";
import { MoviesList } from "./components/MoviesList";
import { FavoriteMovies } from "./components/FavoriteMovies";
import { favMoviesLS } from "./FavMoviesData/ls-data";
import "bootstrap/dist/css/bootstrap.min.css";
import { SiThemoviedatabase } from "react-icons/si";
import { DropMenu } from "./components/Dropdown";
import { ErrorPage } from "./components/ErrorPage";

import axios from "axios"; // npm install axios

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchQuery: "",
      favMovies: favMoviesLS, // imported from local storage
      // favMovies: "", // get data from local storage inside componentDidMount
      menuParam: "",
      responseStatus: true,
    };
  }

  // componentDidMount() {
  //   const favMoviesFromLocalStorage = JSON.parse(
  //     localStorage.getItem("favMovies")
  //   );
  //   this.setState({ favMovies: favMoviesFromLocalStorage });
  // }

  fetchMovies = (url) => {
    axios.get(url).then((response) => {
      // console.log(response); -> status is 200 anyways, check data.Response
      if (response.data.Response === "True") {
        // if valid search input
        this.setState({
          movies: response.data.Search,
          searchQuery: "",
          responseStatus: true, // after prev typo it becomes false
        });
      } else {
        // if typo in search input
        this.setState({ responseStatus: false, searchQuery: "" });
      }
    });
  };

  handleInput = (event) => {
    this.setState({ searchQuery: event.target.value });
    // for dropdown we need last search while re-rendering
    localStorage.setItem("recentSearch", JSON.stringify(event.target.value));
  };

  handleSearch = () => {
    this.state.searchQuery &&
      this.fetchMovies(
        `https://www.omdbapi.com/?apikey=c0790adf&s=${this.state.searchQuery}`
      );
  };

  // handleAddFav = (id) => {
  //   // filter out favMovie by id
  //   const favMovie = this.state.movies.filter((movie) => movie.imdbID === id);

  //   // create tempArr, assign to initial favMovies state
  //   const addArr = this.state.favMovies;

  //   // push extracted ...favMovie to tempArr
  //   addArr.push(...favMovie);

  //   // update state
  //   this.setState({ favMovies: [...addArr] });

  //   // send favMovie to local storage
  //   localStorage.setItem("favMovies", JSON.stringify([...addArr]));
  // };

  handleAddFav = (movieToAdd) => {
    if (
      // check favMovies if includes
      !this.state.favMovies.some((item) => item.imdbID === movieToAdd.imdbID)
    ) {
      // add to existing fav list = push to temp array
      this.setState({ favMovies: [...this.state.favMovies, movieToAdd] });

      // send fav list to local storage
      localStorage.setItem(
        "favMovies",
        JSON.stringify([...this.state.favMovies, movieToAdd])
      );
    } else {
      alert("Already in your favorites!");
    }
  };

  checkFav = (id) => {
    // RETURN to get true of false
    return this.state.favMovies.some((item) => item.imdbID === id);
  };

  handleDeleteFav = (id) => {
    // create tempArr, assign to initial favMovies state
    const deleteArr = this.state.favMovies.filter(
      (movie) => movie.imdbID !== id
    );
    // update state
    this.setState({ favMovies: [...deleteArr] });

    // update local storage
    localStorage.setItem("favMovies", JSON.stringify([...deleteArr]));
  };

  handleMenu = (menuParam) => {
    menuParam === "all"
      ? this.fetchMovies(
          `https://www.omdbapi.com/?apikey=c0790adf&s=${JSON.parse(
            localStorage.getItem("recentSearch")
          )}`
        )
      : this.fetchMovies(
          `https://www.omdbapi.com/?apikey=c0790adf&s=${JSON.parse(
            localStorage.getItem("recentSearch")
          )}&type=${menuParam}`
        );
  };

  render() {
    const { searchQuery, movies, favMovies, responseStatus } = this.state;

    return (
      <div className="App">
        <header className="header">
          <div className="logo-brand">
            <h1>
              {" "}
              <SiThemoviedatabase /> Movies App
            </h1>
          </div>
          <SearchComp
            searchQuery={searchQuery}
            handleInput={this.handleInput}
            handleSearch={this.handleSearch}
          />
          <DropMenu handleMenu={this.handleMenu} />
        </header>

        <div className="container">
          {/* render if array has length, !! converts 0 to false => don't show 0 on UI, option chaining doesn't work in this case, 0 is still visible */}
          <div className="main">
            {!!favMovies.length && (
              <FavoriteMovies
                favMovies={favMovies}
                handleDeleteFav={this.handleDeleteFav}
              />
            )}

            {responseStatus ? (
              !!movies.length && (
                <MoviesList
                  movies={movies}
                  handleAddFav={this.handleAddFav}
                  checkFav={this.checkFav}
                />
              )
            ) : (
              <ErrorPage errorText="Movie not found!" />
            )}
          </div>
        </div>
      </div>
    );
  }
}
