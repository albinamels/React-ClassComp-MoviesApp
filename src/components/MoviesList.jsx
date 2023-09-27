import { Button } from "reactstrap";
import { MdFavorite } from "react-icons/md";

export const MoviesList = ({ movies, handleAddFav, checkFav }) => {
  return (
    <div>
      <h2 className="list-header">Search Results</h2>
      <div className="movies-list">
        {movies.map((movie) => {
          // checkFav() in App returns boolean
          const isFav = checkFav(movie.imdbID); // pass id as an arg
          return (
            <div className="single-movie" key={movie.imdbID}>
              <h6>{movie.Type.toUpperCase()}</h6>
              {movie.Poster === "N/A" ? (
                <img src="https://png.pngtree.com/element_our/png/20181113/clapperboard-film-logo-icon-design-template-vector-isolated-png_236642.jpg" />
              ) : (
                <img src={movie.Poster} />
              )}

              <h4>{movie.Title}</h4>
              <h6>Year: {movie.Year}</h6>

              <Button
                className="fav-btn"
                color="warning"
                onClick={() => handleAddFav(movie)} // pass whole obj as an arg
              >
                <MdFavorite className={isFav && "red"} />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
