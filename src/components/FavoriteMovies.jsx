import { Button } from "reactstrap";
import { FaTrash } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

export const FavoriteMovies = ({ favMovies, handleDeleteFav }) => {
  return (
    <div>
      <h2 className="list-header">My Favorite Movies</h2>
      <div className="movies-list fav-list">
        {favMovies.map((movie) => {
          return (
            <div className="single-movie fav-movie" key={movie.imdbID}>
              <h6>{movie.Type}</h6>
              {movie.Poster === "N/A" ? (
                <img src="https://png.pngtree.com/element_our/png/20181113/clapperboard-film-logo-icon-design-template-vector-isolated-png_236642.jpg" />
              ) : (
                <img width={120} src={movie.Poster} />
              )}

              <h6>
                {/* <MdFavorite className={"red"} /> */}
                {movie.Title}
              </h6>

              <Button
                className="delete-btn mt-3"
                color="warning"
                onClick={() => handleDeleteFav(movie.imdbID)}
              >
                <FaTrash />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
