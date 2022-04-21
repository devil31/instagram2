import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Logout } from '../store/actions/Auth'

function LogOut() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
 

  useEffect(() => {
    
    dispatch(Logout())
       
   
    return navigate("/")
  }, [])



  return (
    <div>
  logout
    </div>
  )
}

export default LogOut;
