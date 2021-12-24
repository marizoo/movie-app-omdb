import React, {useEffect, useState} from 'react'
import MovieList from './components/MovieList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox'
import AddFavorites from './components/AddFavorites'
import RemoveFavorites from './components/RemoveFavorites'


const App = () => {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=9ac2fef7`
      const response = await fetch(url);
      const responseJson = await response.json()

      // console.log(responseJson)
      if (responseJson.Search) {
        setMovies(responseJson.Search)
      }
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  },[searchValue])

  useEffect( () => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'))

    setFavorites(movieFavourites)
  },[])

  const saveToLocalStorage = (items) => {
    localStorage.setItem(
      'react-movie-app-favourites',
      JSON.stringify(items)
    )
  }

  const addFavoriteMovie = (movie) => {
    const newFavouriteList = [...favorites, movie]
    setFavorites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter( favorite =>  
      favorite.imdbID !== movie.imdbID)

      setFavorites(newFavoriteList)
      saveToLocalStorage(newFavoriteList)
  }
 
  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row " >
          <MovieList 
          movies={movies} 
          favoriteComponent={AddFavorites}
          onhandleFavoriteClick={addFavoriteMovie}
          />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className="row " >
          <MovieList 
          movies={favorites} 
          favoriteComponent={RemoveFavorites}
          onhandleFavoriteClick={removeFavoriteMovie}
          />
          
      </div>
    </div>
  )
}

export default App
