import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      // Jika query pencarian kosong, ambil daftar film populer
      getMovieList().then((result) => {
        setPopularMovies(result);
      }).catch((error) => {
        console.error("Error getting popular movies:", error);
      });
    } else {
      // Jika ada query pencarian, cari film sesuai query
      searchMovie(searchQuery).then((result) => {
        setPopularMovies(result);
      }).catch((error) => {
        console.error("Error searching movies:", error);
      });
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const imgBaseUrl = process.env.REACT_APP_BASEIMGURL; // Mendapatkan URL dasar gambar dari variabel lingkungan

  return (
    <div className="App">
      <header className="App-header">
        <h1>K-TIX</h1>

        <input
          placeholder='Cari film terbaik 2023...'
          className='Movie-search'
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div className="Movie-container">
          {popularMovies.map((movie, i) => (
            <div className="Movie-wrapper" key={i}>
              <div className="Movie-title">{movie.title}</div>
              <img className="Movie-image" src={`${imgBaseUrl}${movie.poster_path}`} alt={movie.title} />
              <div className="Movie-date">{movie.release_date}</div>
              <div className="Movie-rate">{movie.vote_average}</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
