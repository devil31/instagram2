import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { signIn } from '../store/actions/Auth'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import '../Styles/Auth.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [isSignup, setIsSignup] = useState(false)

  const loading = useSelector(state => state.Auth.loading)
  const fail = useSelector(state => state.Auth.error)




  const dispatch = useDispatch()
  const inputEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value)
  }

  const inputPassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }
  const inputuserName = (e) => {
    e.preventDefault()
    setUserName(e.target.value)
  }


  const login = async (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    setUserName('');
    dispatch(signIn(email, password, isSignup,username))



  }
  const change = () => {
    setIsSignup(!isSignup)
  }

  return (
    <div className='Auth__container'>
   
      
      <Container  style={{display:'flex',justifyContent:'center'}}>
         <Row >
      <Col  >
             <div className='Auth__sideBoxImage'>
        
      </div>
      </Col>
      <Col>
        <div className='Auth__formContainer'>
      
        <div>
          <p>Instagram</p>
        </div>
        <input className='input' value={email} type={'text'} placeholder='inserisci Email ' onChange={inputEmail}></input>
        <input className='input' value={password} type={'password'} placeholder='Password' onChange={inputPassword}></input>
        {isSignup ? <input className='input' value={username} placeholder='User Name' onChange={inputuserName}></input> : ''}
        {<button className='btn' onClick={login} >{loading ? '' : isSignup ? `Sign Up` : `Login`}</button>}
        {isSignup ? '' : fail ? <p className='AuthFail'>Credenziali errate</p> : ''}
     {loading ? <Spinner animation="border"  variant='info' style={{marginTop:20}}/> : ''}
      </div>
      <div className='parag'>
        {isSignup ? <p>hai gia un account? effettua il <a href='#' onClick={change}>Login</a></p> : <p>non sei ancora registrato? effettua il <a href='#' onClick={change}>SignUp</a></p>}
      
      </div>
      
      </Col>   

      
      </Row>
      </Container>
     
      
    </div>
  )
}

export default Login