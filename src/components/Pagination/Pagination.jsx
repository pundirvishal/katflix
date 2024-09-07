import React from 'react'
import { Typography, Button } from '@mui/material'

const Pagination = ({ currentPage, totalPages, setPage }) => {

    const handlePrevPage = () => {
      if (currentPage !== 1) {
        setPage((prevPage) => prevPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage !== totalPages) {
        console.log(`Current Page: ${currentPage}, Total Pages: ${totalPages}`);
        setPage((nextPage) => nextPage + 1);
      } else {
        console.log('You are on the last page.');
      }
    };
  
    return (
      <div className='flex justify-center items-center'>
        {currentPage !== 1 && (
          <Button
            style={{ margin: '30px 2px' }}
            variant='contained'
            color='primary'
            type='button'
            onClick={handlePrevPage}
          >
            Next
          </Button>
        )}
        <Typography variant='h4' style={{ margin: '0 20px', color: 'primary' }}>{currentPage}</Typography>
        {currentPage !== totalPages && (
          <Button
            style={{ margin: '30px 2px' }}
            variant='contained'
            color='primary'
            type='button'
            onClick={handleNextPage}
          >
            Next
          </Button>
        )}
      </div>
    );
  };
  
  export default Pagination;
  