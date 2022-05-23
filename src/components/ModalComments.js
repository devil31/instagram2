
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { FaUserCircle } from 'react-icons/fa';
import {IoBookmark} from 'react-icons/io5'
import { Modal, Container, Row, Col } from 'react-bootstrap'
import { IoPaperPlaneOutline, IoChatbubbleOutline, IoBookmarkOutline } from 'react-icons/io5'
import { BsHeart, BsEmojiSmile } from 'react-icons/bs';



import { postComment } from '../store/actions/Post';
import '../Styles/ModalComments.css'



function ModalComments(props) {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const handleInput = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }
    const comment = () => {
        if (input == "") {
            return
        } else {
            
            dispatch(postComment(props.postid, props.myusername, input, props.date,props.profileimg))
            setInput('')
        }

    }


    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className='modalCreate_imgContainer nopadding modal_Body' >
                <div style={{ position: 'absolute', color: 'white', fontSize: '35px', top: -200, right: '-30%', cursor: 'pointer', fontWeight: '100', }} onClick={props.onHide}>x</div>
                <Container style={{ width: '100%', height: '100%' }}>
                    <Row style={{ height: '100%', }}  >
                        <Col className="nopadding" style={{ backgroundImage: `url(${props.loadimg})`, backgroundSize: 'cover', flex: 1, height: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderBottomLeftRadius: '4px', borderRight: '1px solid lightgrey' }}
                        >
                        </Col>
                        <Col className="nopadding" style={{ position: 'relative' }}>

                            <div className="modal_container">

                                <div className="modal_header">
                                    <div className="containerNickAv"  >
                                        {
                                            props.profileimg ? <div style={{ width: 40, height: 40, border: '1px solid lightgrey', borderRadius: 100, backgroundImage: `url(${props.profileuser})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}></div> : <FaUserCircle color='lightgrey' size={'40px'} />
                                        }


                                        <div className='modal_username'>
                                            <p> {props.username}</p>
                                        </div>

                                    </div>
                                    <div>
                                        <p>...</p>
                                    </div>
                                </div>
                                <div className="modal_body">
                                    {props.rendercomments}
                                </div>

                                <div className="modal_footer">
                                    <div className="modal_footerIcons">
                                        <div>
                                            <BsHeart size={'22px'} style={{ marginRight: '10px', marginLeft: '5px' }} />
                                            <IoChatbubbleOutline size={'22px'} style={{ marginRight: '10px' }} />
                                            <IoPaperPlaneOutline size={'22px'} />
                                        </div>

                                        <div className="modalIconSave">
                                          { props.color == false ? <IoBookmarkOutline size={'25px'} onClick={props.save}  /> : <IoBookmark onClick={props.save} size={25} />}
                                        </div>
                                    </div>
                                    <div className="modal__footerLikes">
                                        Piace a <strong>dev</strong> e <strong>altri</strong>
                                    </div>
                                    <div className="modal__footerDate">

                                        {props.fulldate.day} {props.m[props.fulldate.Month]} {props.fulldate.Year}
                                    </div>
                                    <div className="modal__footerAddComment">
                                        <span><BsEmojiSmile size={20} /></span>
                                        <input type="text" placeholder='Aggiungi commento...' onChange={handleInput} value={input} />
                                        <label onClick={comment}>Pubblica</label>
                                    </div>
                                </div>


                            </div>

                        </Col>
                    </Row>

                </Container>
            </Modal.Body>

        </Modal>
    )
}

export default ModalComments