import React from 'react'
import { Link, Outlet,useParams } from 'react-router-dom'
import Header from '../components/Header'
import '../Styles/Saved.css'

function Profile() {
const {username} = useParams()
  return (
    <div className='Saved__Container'>
   
      <Header />
      <div className='Saved__Setup'>
        <div className="Saved__Avatar">
        </div>
        <div className="Saved__Profile">
          <p>{username}</p>
          <button>Modifica Profilo </button>
         
        </div>
        
           
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }} >

        <div style={{ padding:'10px', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
          <Link style={{ textDecoration: 'none', fontSize: 12, color: 'grey' }} to={`/${username}/`}>POST</Link>
          <Link  style={{ textDecoration: 'none', fontSize: 12, color: 'grey' }} to={`saved`}>ELEMENTO SALVATO</Link>
          <Link style={{ textDecoration: 'none', fontSize: 12, color: 'grey' }} to={`/${username}/tag`}>POST IN CUI TI HANNO TAGGATO</Link>

 
 
        </div>
  
 
      <Outlet /> 

      </div>
 
    </div>
  )
}

export default Profile