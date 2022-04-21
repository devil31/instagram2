import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import LogOut from './pages/Logout';
import { useSelector,useDispatch } from 'react-redux';
import { authCheck } from './store/actions/Auth';



function App() {
  const token = useSelector(state => state.Auth.token)
  const dispatch = useDispatch()
  
  useEffect(()=>{
dispatch(authCheck())
  },[])
  return (
    <div >
      {token ?
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/logout' element={<LogOut />} />
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
