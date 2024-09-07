import React, { useEffect, useState } from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useGetActorsDetailsQuery, useGetMoviesByActorsIdQuery } from '../../services/TMDB'
import genreIcons from '../../assets/genres'
import { useTheme } from '@mui/material/styles'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import { userSelector } from '../../features/auth'
import MovieList from '../MovieList/MovieList'
import { Pagination } from '../'

const Actors = () => {

  const history = useNavigate();
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const [page, setPage] = useState(1);
  const { data: movies, isFetching: isMoviesFetching } = useGetMoviesByActorsIdQuery({ actorsId: id, page });
  
  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress size='8rem' />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Link to='/'>Something has gone wrong. Please Try Again!</Link>
      </Box>
    )
  }

  return (
    <>
      <Grid container alignItems="center" justifyContent="center" className='flex justify-around mt-3 mb-3 custom-max:flex-col custom-max:flex-wrap'>
        <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px', justifyContent: 'center' }}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}` || 'https://via.placeholder.com/300x450'}
            alt={data?.name}
            className='rounded-3xl shadow-2xl w-4/5 shadow-black mb-8 ml-12 custom-xl:mr-24 custom-max:mr-auto custom-max:ml-auto 
            custom-max:mt-0 custom-max:mb-8 custom-max:w-full custom-max:h-96 custom-max-md:mb-0 custom-max-md:mt-0
            custom-max-md:ml-auto custom-max-md:mr-auto custom-max-md:w-1/2 custom-max-md:h-full object-cover'
            style={{ alignSelf: 'center' }}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant="h2" gutterBottom>{data?.name}</Typography>
            <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
            <Typography variant="body1" align="justify" paragraph>
              {data?.biography || 'Sorry, no biography yet...'}
            </Typography>
            <Box marginTop="2rem" display="flex" justifyContent="space-around">
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                href={`https://www.imdb.com/name/${data?.imdb_id}`}
              >
                IMDB
              </Button>
              <Button startIcon={<ArrowBack />} onClick={() => history(-1)} color="primary">
                Back
              </Button>
            </Box>
          </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" align="center" gutterBottom>Movies</Typography>
        {isMoviesFetching && (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        )}
        {!isMoviesFetching && (
          movies && movies?.results?.length
            ? (
              <>
                <MovieList movies={movies} numberOfMovies={12} />
                <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
              </>
            )
            : <Box><Typography variant="h6" align="center">Sorry, nothing was found.</Typography></Box>
        )}
      </Box>
    </>
  )
}

export default Actors