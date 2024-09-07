import React from 'react'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'   
import { Link } from 'react-router-dom'


const FeaturedMovie = ({ movie }) => {
    
  if(!movie) return null;

  console.log(movie)

  return (
    <Box component={Link} to={`/movie/${movie.id}`} className='relative mb-5 flex justify-center h-custom-490'>
        <Card className='w-full flex justify-end flex-col'>
            <CardMedia
                media="picture"
                alt={movie.title}
                title={movie.title}
                image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-55 bg-blend-darken'
            />
            <Box padding='20px'>
                <CardContent className='text-white w-2/5 custom-max:w-full relative bg-transparent'>
                    <Typography variant='h5' gutterBottom>{movie.title}</Typography>
                    <Typography variant='body2'>{movie.overview}</Typography>
                </CardContent>
            </Box>
        </Card>
    </Box>
  )
}

export default FeaturedMovie