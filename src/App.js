import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/Login';
import LogOut from './pages/Logout';
import Post from './pages/Post';
import PostPage from './pages/PostPage';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

import { authCheck } from './store/actions/Auth';





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
          <Route path='/p/:postId' element={<PostPage/>}/>
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
