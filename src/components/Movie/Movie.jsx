import React from 'react'
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material'
import { Link } from 'react-router-dom'


const Movie = ({ movie, i }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className='p-3'>
        <Grow in key={i} timeout={ (i + 1) * 200 }>
            <Link className='items-center font-bold custom-xs:flex-col hover:cursor-pointer hover:no-underline' to={`/movie/${movie.id}`}>
                {movie.poster_path 
                ? <img alt={movie.title} className='rounded-3xl custom-h-80 mb-3 hover:scale-105' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                : <img alt={movie.title} className='rounded-3xl custom-h-80 mb-3 hover:scale-105' src='https://via.placeholder.com/230x350'/>
                }
                <Typography variant='h5' className='text-ellipsis w-60 whitespace-nowrap overflow-hidden mt-3 mb-0 text-center'>
                    {movie.title}
                </Typography>
                <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
                    <div>
                <Rating readOnly value={movie.vote_average / 2} precision={0.1} className='text-center'/>
                    </div>
                </Tooltip>
            </Link>
        </Grow>
        
    </Grid>
  )
}

export default Movie