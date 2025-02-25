import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";

const MovieList = props => {
  const [movies, setMovies] = useState([]);
  console.log(props.addToSavedList);
  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies")
        .then(response => {
          setMovies(response.data);
        })
        .catch(error => {
          console.error("Server Error", error);
        });
    };

    getMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieDetails
          handleClick={props.addToSavedList}
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
};

function MovieDetails({ movie, handleClick }) {
  const { id, title, director, metascore, stars } = movie;
  return (
    <div className="movie-card">
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/movie/${id}`}
      >
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
        <button onClick={handleClick}>Save Movie</button>
      </Link>
    </div>
  );
}

export default MovieList;
