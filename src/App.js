import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import ContactForm from './components/ContactForm';
import EditMovieForm from './components/EditMovieForm';

const App = () => {
  return (
    <Router>
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <Link to='/'>
            <MovieListHeading heading='Movies' />
          </Link>
          <Link to='/favourites'>
            <MovieListHeading heading='Favourites' />
          </Link>
          <Link to='/ContactForm'>
            <MovieListHeading heading='ContactForm' />
          </Link>
        </div>
        <Routes>
          <Route path='/' element={<MoviePage />} />
          <Route path='/favourites' element={<FavouritesPage />} />
          <Route path='/ContactForm' element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  const updateMovie = (updatedMovie) => {
	
	const updatedMovies = movies.map((movie) => {
	  if (movie.imdbID === updatedMovie.imdbID) {
		return { ...movie, ...updatedMovie };
	  }
	  return movie;
	});
	setMovies(updatedMovies);
  };
  
  const addFavoriteMovie = (movie) => {
	
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  console.log(setFavorites);
};

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className='row'>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavoriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
    </>
  );
};


const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </>
  );
};

const ContactPage = () => {
  return (
    <>
      <div className='row'>
        <h2>Contact Information</h2>
      </div>
      <div className='row'>
        <ContactForm />
      </div>
    </>
  );
};

export default App;
