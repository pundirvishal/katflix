import React, { useEffect, useState } from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useGetMovieQuery, useGetRecommendationsQuery, useGetUsersListQuery } from '../../services/TMDB'
import genreIcons from '../../assets/genres'
import { useTheme } from '@mui/material/styles'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import { userSelector } from '../../features/auth'
import MovieList from '../MovieList/MovieList'

const MovieInfo = () => {

  const history = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();
  const noImage = 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg';
  const user = useSelector(userSelector);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const addToFavorites = async () => {
    const baseUrl = 'https://api.themoviedb.org/3';
    await axios.post(`${baseUrl}/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id, //which movie to favorite
      favorite: !isMovieFavorited,
    });

    setIsMovieFavorited((prevState) => !prevState);
  };

  const addToWatchlist = async () => {
    const baseUrl = 'https://api.themoviedb.org/3';
    await axios.post(`${baseUrl}/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id, //which movie to favorite
      watchlist: !isMovieWatchlisted,
    });

    setIsMovieWatchlisted((prevState) => !prevState);
  };


  /*seting the initial value of isMovieFavorited/isMovieWatchlisted*/
  const { data: favoriteMovies, refetch: refetchFavorited } = useGetUsersListQuery({ accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1, list: 'favorite/movies' });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetUsersListQuery({ accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1, list: 'watchlist/movies' });


  useEffect(() => {
    refetchFavorited();
    refetchWatchlisted();
  }, []);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  /*fetching the recommendations*/
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ movieId: id, list: 'recommendations' });

  /*modal state*/
  const [open, setOpen] = useState(false);


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
    <Grid container alignItems="center" justifyContent="center" className='flex justify-around mt-3 mb-3 custom-max:flex-col custom-max:flex-wrap'>
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px', justifyContent: 'center' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt={data.title}
          className='rounded-3xl shadow-2xl w-3/5 shadow-black mb-8 custom-xl:mr-24 custom-max:mr-auto custom-max:ml-auto 
          custom-max:mt-0 custom-max:mb-8 custom-max:w-full custom-max:h-96 custom-max-md:mb-0 custom-max-md:mt-0
          custom-max-md:ml-auto custom-max-md:mr-auto custom-max-md:w-1/2 custom-max-md:h-full object-cover'
          style={{ alignSelf: 'center' }}
        />
      </Grid>
      <Grid item container direction='column' lg={7}>
        <Typography variant='h3' className='text-center custom-max-md:pt-6' gutterBottom>{data?.title} ({data.release_date.split('-')[0]})</Typography>
        <Typography variant='h5' className='text-center' gutterBottom>{data?.tagline} </Typography>
        <Grid item className='flex justify-around mt-3 mb-3 custom-max:flex-col custom-max:flex-wrap'>
          <Box display='flex' align='center'>
            <Rating readOnly value={ data.vote_average / 2 }/>
            <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px' }}> {data?.vote_average} / 10</Typography>
          </Box>
          <Typography variant='h6' gutterBottom className='custom-max-xl:pl-4'>{data?.runtime} min | Language: {data?.spoken_languages[0].name}</Typography>
        </Grid>
        <Grid item className='mb-3 mt-3 flex justify-around flex-wrap'>
          {data?.genres.map((genre) => (
            <Link key={genre.name} className='flex justify-center items-center underline custom-max:pt-2 custom-max:pb-2 custom-max:pl-4 custom-max:pr-4' to='/' onClick={() => dispatch(selectGenreOrCategory(genre?.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} alt={genre.name} className={`${theme.palette.mode === 'dark' ? 'invert mr-3 h-8' : 'invert-0 mr-3 h-8'}`}/>
              <Typography color='textPrimary' variant='subtitle1'>
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' style={{ marginTop: '10px' }} gutterBottom className='text-left'>Overview</Typography>
        <Typography variant='h7' style={{ marginBottom: '2rem' }} gutterBottom className='text-left'>{data?.overview}</Typography>
        <Typography variant='h5' style={{ marginTop: '15px' }} gutterBottom className='text-left'>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data?.credits?.cast?.slice(0, 6)?.map((character, i) => (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character?.id}`} style={{ textDecoration: 'none' }}>
              <img
                className='w-full max-w-28 h-32 object-cover rounded-xl'
                src={character?.profile_path ? `https://image.tmdb.org/t/p/w500/${character?.profile_path}` : noImage}
                alt={character?.name}
              />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }} justifyContent="center">
          <div className='flex justify-around w-full items-center custom-max-xl:w-fit custom-max-lg:flex-col custom-max:items-center custom-max-md:items-start'>
            { /*website, IMDB, trailer*/ }
            <Grid item xs={12} sm={6} className='flex justify-around w-full items-center custom-max-xl:w-fit custom-max-lg:flex-col custom-max:items-center custom-max-md:items-center'>
              <ButtonGroup size="medium" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>

            { /*favorite, watchlist, back*/ }
            <Grid item xs={12} sm={6} className='flex justify-around w-full items-center custom-max-xl:w-fit custom-max-lg:flex-col custom-max:items-center custom-max-md:items-start'>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }} onClick={() => history(-1)}>
                  <Typography style={{ textDecoration: 'none' }} color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      { /*recommended movies*/ }
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          You might also like
        </Typography>
        {isRecommendationsFetching && (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        )}
        {!isRecommendationsFetching && (
          recommendations && recommendations?.results?.length
            ? <MovieList movies={recommendations} numberOfMovies={12} />
            : <Box><Typography variant="h6" align="center">Sorry, nothing was found.</Typography></Box>
        )}
      </Box>

      { /*movie trailer*/ }
      {data?.videos?.results?.length > 0 && (
        <Modal closeAfterTransition className='flex items-center justify-center' open={open} onClose={() => setOpen(false)}>
          <iframe
            autoPlay
            className='w-1/2 h-1/2 custom-max:w-11/12 custom-max:h-11/12'
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}?autoplay=1`}
            allow="autoplay"
            allowFullScreen
          />
        </Modal>
      )}
    </Grid>
  )
}

export default MovieInfo