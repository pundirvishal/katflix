import React from 'react'
import { CssBaseline } from '@mui/material'
import { Routes as Switch, Route } from 'react-router-dom';
import { Actors, MovieInfo, Movies, NavBar, Profile } from './index'
import './index.css'

const App = () => {
  return (
    <div className='h-full flex w-full'>
        <CssBaseline />
        <NavBar />
        <main className='flex-grow p-8 custom-max:pl-8 pl-12 mt-20'>
            <div className='h-16'>
                <Switch>
                <Route exact path="/movie/:id" element={<MovieInfo />} /> { /*notice: /:id <=> /<number>*/ }
                <Route exact path="/actors/:id" element={<Actors />} />
                <Route exact path="/*" element={<Movies />} /> { /*notice: it's smart to use 'exact'*/ }
                <Route exact path="/approved" element={<Movies />} />
                <Route exact path="/profile/:id" element={<Profile />} />
                </Switch>
            </div>
        </main>
    </div>
  )
}

export default App