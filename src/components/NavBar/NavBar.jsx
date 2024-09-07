import React, { useContext, useEffect, useState } from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import Sidebar from '../Sidebar/Sidebar'
import { Search } from '../'
import { createSessionID, fetchToken, moviesAPI } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, userSelector } from '../../features/auth'
import { ColorModeContext } from '../../utils/ToggleColorMode'

const NavBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)'); //if width > 600px => isMobile == false
  const theme = useTheme();
  const [MobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem('request_token');

  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        try {
          const sessionId = localStorage.getItem('session_id') ? localStorage.getItem('session_id') : await createSessionID();

          const { data: userData } = await moviesAPI.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        } catch (error) {
          console.log('Your user data could not be fetched.');
        }
      }
    };
    logInUser();
  }, [token]);

  const { isAuthenticated, user } = useSelector(userSelector);

  return (
    <>
        <AppBar position='fixed'>
            <Toolbar className='h-20 flex justify-between ml-60 custom-max:ml-0 custom-max:flex-wrap'>
                {isMobile && (
                    <IconButton
                    color='inherit'
                    edge='start'
                    style={{ outline: 'none' }}
                    onClick={() => setMobileOpen((previousMobileOpen) => (!previousMobileOpen))}
                    className='custom-max:mr-1 custom-sm:hidden'
                    >
                        <Menu />
                    </IconButton>
                )}
                <IconButton
                color='inherit'
                className='custom-max:w-10 w-10'
                style={{ marginLeft: '35px' }}
                onClick={colorMode.toggleColorMode}
                >
                  {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                {!isMobile && <Search />}
                <div>
                  {!isAuthenticated ? (
                    <Button color='inherit' onClick={fetchToken}>
                      Login &nbsp; <AccountCircle />
                    </Button>
                  ) : (
                    <Button
                    color='inherit'
                    component={Link}
                    to={`/profile/${user.id}`}
                    onClick={() => {}}
                    >
                      {!isMobile && <>My Movies &nbsp;</>}
                      <Avatar
                      className='w-8 h-8'
                      alt='Profile'
                      src={user?.avatar?.tmdb?.avatar_path
                        ? `https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`
                        : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
                      />
                    </Button>
                  )}
                </div>
                {isMobile && <Search />}
            </Toolbar>
        </AppBar>
        <div>
          <nav className='custom-max:w-1 w-60 custom-max:flex flex-shrink-0'>
            {isMobile? (
              <Drawer
              variant='temporary'
              anchor='right'
              open={MobileOpen}
              onClose={() => setMobileOpen((previousMobileOpen) => (!previousMobileOpen))}
              className='custom-max:w-10 w-60'
              ModalProps={{ keepMounted: true }}
              >
                <Sidebar setMobileOpen={setMobileOpen} />
              </Drawer>
            ) : (
              <Drawer className='custom-max:w-10 w-10' variant='permanent'>
                <Sidebar setMobileOpen={setMobileOpen} />
              </Drawer>
            )}
          </nav>
        </div>
    </>
  )
}

export default NavBar