import React from 'react'
import { Grid } from '@mui/material'
import Movie from '../Movie/Movie'

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  return (
    <div>
        <Grid container className='flex wrap justify-center overflow-auto custom-sm:justify-between'>
        {movies?.results?.slice(excludeFirst ? 1 : 0, numberOfMovies)?.map((movie, i) => (
          <Movie key={i} movie={movie} i={i} />
            ))}
        </Grid>
    </div>
  )
}

export default MovieList