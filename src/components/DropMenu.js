import React from 'react'
import { Link } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs'
import { IoBookmarkOutline } from 'react-icons/io5'
import '../Styles/DropMenu.css'


function DropMenu(myUserName) {
  
    return (

        <div className='drop_menuContainer'>
            <div className="drop_menuBody">
                <Link  to={`/${myUserName.myUserName}/`}>
                <div className='drop_icon'>
                        <BsPersonCircle size={20}  />
                    <div style={{marginLeft:'10px'}}>Profilo</div>
                </div>
                
                </Link>

                <Link to={`/${myUserName.myUserName}/saved`}>
                    <div className='drop_icon'>
                        <IoBookmarkOutline size={20}  />
                    <div style={{marginLeft:'10px'}}>Elementi salvati</div>
                </div>                
                </Link>

                <Link to={"/logout"}>
                    <div className='drop_icon'>                       
                    <div style={{marginLeft:'10px'}}>Esci</div>
                </div>                
                </Link>
           
            </div>


        </div>
    )
}

export default DropMenu