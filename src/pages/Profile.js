import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet,useParams } from 'react-router-dom'
import Header from '../components/Header'
import '../Styles/Saved.css'


function Profile() {
  
  const userData = useSelector(state=>state.Auth.userData)
  const myId = JSON.parse(localStorage.getItem('userId')).userId
  const filterUser = userData.filter(obj=>obj.userId == myId)
  
  const profileimg = filterUser && filterUser[0].profileImg;
  
 
const {username} = useParams()
  return (
    <div className='Saved__Container'>
   
      <Header />
      <div className='Saved__Setup'>
        <div className="Saved__Avatar" style={{backgroundImage:`url(${profileimg})`,backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        </div>
        <div className="Saved__Profile">
          <p><strong>{username}</strong></p>
          <button><Link style={{textDecoration:'none',color:'black'}} to={'/accounts/edit'}>Modifica Profilo</Link> </button>
         
        </div>
        
           
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }} >

        <div style={{ padding:'10px', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
          <Link style={{ textDecoration: 'none', fontSize: 12, color: 'grey' }} to={`/${username}/`}>POST</Link>
          <Link  style={{ textDecoration: 'none', fontSize: 12, color: 'grey' }} to={`saved`}>ELEMENTO SALVATO</Link>

 
 
        </div>
  
 
      <Outlet /> 

      </div>
 
    </div>
  )
}

export default Profile