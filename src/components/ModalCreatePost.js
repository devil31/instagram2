import React, { useState } from 'react';
import { Modal, Container, Col, Row, } from 'react-bootstrap';
import { BsGeoAlt } from "react-icons/bs";
import '../Styles/ModalCreatePost.css'
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../store/actions/Post';




function ModalCreatePost(props) {
  const [loadImg, setLoadImg] = useState(false)
  const [loc, setLoc] = useState('')
  const [txtArea, setTxtArea] = useState('')
  const loading = useSelector(state => state.Post.loading)


  const dispatch = useDispatch();

  const handlerInput = () => {

  }
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        await setLoadImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  const share = () => {
    const date = {
      day: new Date().getUTCDate(),
      Month: new Date().getMonth() + 1,
      Year: new Date().getFullYear(),
    }
    dispatch(createPost(txtArea, loc, props.username, loadImg, date))
    if (loading == false) {
      props.onHide()
      setLoadImg('')
      setLoc('')
      setTxtArea('')
    }
  }

  const handlerTxtArea = (e) => {
    setTxtArea(e.target.value)
  }
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered

    >

      <Modal.Header closeButton className='text-center' >
        <Container>
          <Modal.Title id="contained-modal-title-vcenter" className='mx-auto'  >
            Crea un nuovo post
          </Modal.Title>
        </Container>

      </Modal.Header>
      {loadImg ?

        <Modal.Body className='modalCreate_imgContainer nopadding'>
          <Container style={{ width: '100%', height: '100%' }}>
            <Row style={{ height: '100%', }}  >
              <Col className=' bg-dark' style={{ backgroundImage: `url(${loadImg})`, backgroundSize: 'cover', flex: 1, height: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderBottomLeftRadius: '4px', }}>

              </Col>
              <Col style={{ borderBottomRightRadius: '4px' }} className='nopadding'>
                <div className='header_ModalCreate' >
                  <div>
                    <FaUserCircle color='lightgrey' size={'30px'} />
                  </div>

                  <div style={{ height: 30, marginLeft: 5 }}>
                    <p>{props.username}</p>
                  </div>

                </div>
                <div >
                  <textarea className='txtArea' value={txtArea} placeholder='Scrivi una didascalia...' onChange={handlerTxtArea}></textarea>
                  <div className="containerLoc">
                    <input className='modalInput' placeholder="Aggiungi luogo" onChange={handlerInput} value={loc} />
                    <BsGeoAlt color='black' size={'16px'} />
                  </div>
                  <div className="btnShare">
                    <p onClick={share}>Condividi</p>
                  </div>


                </div>

              </Col>
            </Row>
          </Container>
        </Modal.Body>
        :
        <Modal.Body   >
          <div className='modalCreate_imgContainer'>
            <img width={'100px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoVGThfMUGNAxEudBUgOIwWU9OEm6eoy_NtdLy9UklgW9sPEzp9b65UdNHgnZX-vi0jAM&usqp=CAU' />
            <p className=''>Carica le foto e i video qui</p>
            <label className='uploadImg' htmlFor='file-upload' >
              Seleziona dal computer
            </label>
            <input style={{ display: 'none' }} id='file-upload' type={'file'} onChange={imageHandler} ></input>
          </div>

        </Modal.Body>
      }
    </Modal>
  )
}

export default ModalCreatePost