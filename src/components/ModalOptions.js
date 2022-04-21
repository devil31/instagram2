
import React from 'react'
import { Modal, Container, Row, Col } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap';



function ModalOptions(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {props.spinner == false ?
             <Modal.Body className='nopadding'>
                    <Container className='nopadding' style={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center' }}>
                        <Row onClick={props.deletePost} style={{ marginTop: '10px', borderBottom: '1px solid grey', width: '100%', textAlign: 'center', cursor: 'pointer', color: 'red' }}>
                            <p>Elimina</p>
                        </Row>
                        <Row style={{ borderBottom: '1px solid grey', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                            <p>Vai al post</p>
                        </Row>
                        <Row style={{ width: '100%', textAlign: 'center', cursor: 'pointer' }} onClick={() => props.onHide()}>
                            <p> Annulla</p>
                        </Row>

                    </Container>

                </Modal.Body>
                :
                <Modal.Body className='nopadding'>
                    <Container style={{ height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Spinner animation='border' />
                    </Container>
                </Modal.Body> 

               
            }
        </Modal>
    )
}

export default ModalOptions