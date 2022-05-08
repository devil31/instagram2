import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import LogOut from './pages/Logout';
import Post from './pages/Post';
import P from './pages/P';
import { useSelector, useDispatch } from 'react-redux';
import { authCheck } from './store/actions/Auth';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';



function App() {
  const token = useSelector(state => state.Auth.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authCheck())
  }, [])
  return (
    <div >
      {token ?
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/logout' element={<LogOut />} />
          <Route path='/:username' element={<Profile/>}>
          <Route path = '/:username' element={<Post/>}/>
         <Route path='saved' element={<Saved/>}/>
    
          </Route>
          <Route path='/p/:postId' element={<P/>}/>
          <Route path='/accounts/edit' element={<EditProfile/>}/>
   
        </Routes>
        :
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      }

    </div>
  );
}

export default App;
