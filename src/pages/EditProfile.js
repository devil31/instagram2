import React from 'react'

import EditBox from '../components/EditBox'
import Header from '../components/Header'

function EditProfile() {
  return (
    <div  style={{display:'flex',justifyContent:'center'}}>
        <Header/>
        <EditBox/>
        
    </div>
  )
}

export default EditProfile