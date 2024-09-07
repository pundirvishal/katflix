import React, { useState, useEffect } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { searchMovie } from '../../features/currentGenreOrCategory'

const Search = () => {

  const dispatch = useDispatch();
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const location = useLocation();

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      dispatch(searchMovie(query));
    } else {
      dispatch(searchMovie(query));
    }
  }

  if (location.pathname !== '/') return null;


  return (
    <div className='custom-max:flex custom-max:items-center custom-max:w-full'>
        <TextField
        placeholder='Search...'
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant='standard'
        style={{ color: 'white' }}
        InputProps={{
            className: `${theme.palette.mode === 'light' ? 'invert' : 'invert-0'} custom-max:ml-10 custom-max:w-full custom-max:-mt-4 custom-max:mb-8`,
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
        }}
        />
    </div>
  )
}

export default Search