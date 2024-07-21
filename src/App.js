import { React, useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './components/Movie.Card';


const API_URL = 'http://www.omdbapi.com?apikey=f98a6f90';

const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSerchTerm] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
       searchMovies('mulan');
    }, []);

    return (
        <div className="app">
            <h1>FilmFinder</h1>

            <div className="search">
            <input
                placeholder="search for movies"
                value={searchTerm}
                onChange={(e) => setSerchTerm(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
            />
            </div>

            {movies?.length > 0
                ? (
                  <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                  </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found.</h2>
                    </div>
                )}

        </div>
    );
}

export default App;