import React from 'react'

const MovieList = ({movies, favoriteComponent, onhandleFavoriteClick}) => {

    const FavoriteComponent = favoriteComponent
    return (
        <>
            {movies.map((movie, index) => (
                <div key={index} className='image-container d-flex justify-content-start m-3 movie-box'>
                    <img src={movie.Poster} alt='movie poster'></img>
                    <div onDoubleClick={() => onhandleFavoriteClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                        <FavoriteComponent/>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MovieList
