import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { actionLogoutAsyn } from '../Redux/Actions/actionsLogin';

const NavBarB = () => {

    const dispatch = useDispatch();
    const navegar = useNavigate()
    const perfil = getAuth()

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to="/home" style={{ textDecoration: "none", color: "red" }}>TIENDITA</Link></Navbar.Brand>
                {perfil ? <Button onClick={() => navegar("/profile")}>Profile</Button> : <Button onClick={() => navegar("/login")}>Login</Button>}
                <Button variant="warning" onClick={() => navegar("/administrator")}>Administrador</Button>
                <Button variant="danger" onClick={() => dispatch(actionLogoutAsyn())}>LogOut</Button>
                <Button variant="danger" onClick={() => navegar("/test")}>Test</Button>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarB