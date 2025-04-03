import React from 'react';

const MovieDetails = ({ movie }) => {
    if (!movie) {
        return <div>Select a movie to see the details.</div>;
    }

    return (
        <div className="movie-details">
            <h2>{movie.title}</h2>
            <img src={movie.posterUrl} alt={`${movie.title} poster`} />
            <p>{movie.description}</p>
            <h3>Showtimes:</h3>
            <ul>
                {movie.showtimes.map((showtime, index) => (
                    <li key={index}>{showtime}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieDetails;