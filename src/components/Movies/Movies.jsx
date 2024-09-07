import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, useMediaQuery, Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import { useGetMoviesQuery } from '../../services/TMDB'
import MovieList from '../MovieList/MovieList'
import { FeaturedMovie, Pagination } from '../index.js'

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  const lgDevice = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMoviesToShow = lgDevice ? 17 : 19; //notice: data?.results?.length === 20

  if (isFetching) {
    return (
    <Box className='flex justify-center items-center h-screen'><CircularProgress className='size-4'/></Box>
    )
  }

  if (!data.results.length) {
    return (
      <Box className='flex justify-center items-center h-screen'>
        <Typography variant='h4' className='text-center'>No movies found</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className='flex justify-center items-center h-screen'>
        <Typography variant='h4' className='text-center'>An error occurred</Typography>
      </Box>
    )
  }

  return (
    <div className='ml-7'>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMoviesToShow} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  )
}

export default Movies