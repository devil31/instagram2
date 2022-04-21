import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { BsHouseDoor, BsPlusSquare, BsHeart, BsPersonCircle } from 'react-icons/bs'
import { IoPaperPlaneOutline, IoCompassOutline, } from 'react-icons/io5'
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCreatePost from './ModalCreatePost';
import { useSelector,  } from 'react-redux';



function Header() {

    const [modalShow, setModalShow] = useState(false);
    const myUserData = useSelector(state => state.Auth.userData)
    const myId = JSON.parse(localStorage.getItem('userId')).userId
    const findUser = myUserData.find(e => e.userId == myId)

    const username = findUser && findUser.username

    return (
        <Navbar fixed="top" variant="light" style={{ borderBottom: '1px solid lightgrey', background: 'white' }}>
            <Container>
                <Navbar.Brand href="/">Instagram</Navbar.Brand>

                <Nav className=" justify-content-end">
                    <Nav.Link href="/"><BsHouseDoor size={20} /></Nav.Link>
                    <Nav.Link href="/logout"><IoPaperPlaneOutline size={20} /></Nav.Link>
                    <Nav.Link ><BsPlusSquare onClick={() => setModalShow(true)} size={20} /></Nav.Link>
                    <Nav.Link href="#a"><IoCompassOutline size={25} /></Nav.Link>
                    <Nav.Link href="/logout"><BsHeart size={20} /></Nav.Link>
                    <Nav.Link href="" ><BsPersonCircle size={20} /></Nav.Link>
                </Nav>
            </Container>
            <ModalCreatePost
                show={modalShow}
                onHide={() => setModalShow(false)}
                username={username}


            />
        </Navbar>

    )
}

export default Header