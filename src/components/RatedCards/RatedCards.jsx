import React from 'react';
import { Typography, Box } from '@mui/material';

import { Movie } from '..';

function RatedCards({ title, data }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {data?.results?.map((movie, i) => (
          <Box key={movie.id} width="17.5%">
            <Movie movie={movie} i={i} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;