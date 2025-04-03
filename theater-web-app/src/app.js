import React, { useState, useEffect } from 'react';
import TheaterList from './components/TheaterList';
import MovieDetails from './components/MovieDetails';
import SearchBar from './components/SearchBar';

const App = () => {
    const [theaters, setTheaters] = useState([]);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/data/theaters.json')
            .then(response => response.json())
            .then(data => setTheaters(data))
            .catch(error => console.error('Error fetching theaters:', error));
    }, []);

    useEffect(() => {
        if (selectedTheater) {
            fetch(`https://api.finnkino.fi/Showtimes?Theater=${selectedTheater.id}`)
                .then(response => response.json())
                .then(data => setMovies(data.data))
                .catch(error => console.error('Error fetching movies:', error));
        }
    }, [selectedTheater]);

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app">
            <h1>Theater Movie Listings</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TheaterList theaters={theaters} setSelectedTheater={setSelectedTheater} />
            {selectedTheater && (
                <MovieDetails movies={filteredMovies} />
            )}
        </div>
    );
};

export default App;