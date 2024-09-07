import React, { useEffect, useState } from 'react'
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useGetGenresQuery } from '../../services/TMDB'
import genreIcons from '../../assets/genres'
import { useDispatch, useSelector } from 'react-redux'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import KatflixBlue from '../../assets/logos/KatflixBlue.png'
import KatflixRed from '../../assets/logos/KatflixRed.png'

const blueLogo = KatflixBlue
const redLogo = KatflixRed

const categories = [
    { name: 'Popular', value: 'popular' },
    { name: 'Top Rated', value: 'top_rated' },
    { name: 'Upcoming', value: 'upcoming' },
];

const Sidebar = ({ setMobileOpen }) => {

  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { data, isFetching } = useGetGenresQuery();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
    <Link to='/' className='flex justify-center pt-4 pb-4 w-64'>
    <img
    className='w-48'
    src={isDarkMode ? redLogo : blueLogo}
    alt='Katflix'
    />
    </Link>
    <List>
        <ListSubheader>Categories</ListSubheader>

        { isFetching ? (
            <Box display='flex' justifyContent='center'>
                <CircularProgress />
            </Box>
        ) :
        categories.map(({ name, value }) => (
            <Link key={name} className='' to='/'>
                <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                    <ListItemIcon>
                        <img
                        src={genreIcons[name.toLowerCase()]}
                        alt={name}
                        className={`w-6 h-6 ${isDarkMode ? 'invert' : 'invert-0'}`}
                        />
                    </ListItemIcon>
                    <ListItemText primary={name}/>
                </ListItem>
            </Link>
        ))}   
    </List>
    <Divider />
    <List>
        <ListSubheader>Genres</ListSubheader>

        { isFetching ? (
            <Box display='flex' justifyContent='center'>
                <CircularProgress />
            </Box>
        ) :
        data.genres.map(({ name, id }) => (
            <Link key={name} className='' to='/'>
                <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                    <ListItemIcon>
                        <img
                        src={genreIcons[name.toLowerCase()]}
                        alt={name}
                        className={`w-6 h-6 ${isDarkMode ? 'invert' : 'invert-0'}`}
                        />
                    </ListItemIcon>
                    <ListItemText primary={name}/>
                </ListItem>
            </Link>
        ))}   
    </List>
    </>
  )
}

export default Sidebar