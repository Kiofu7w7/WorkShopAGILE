import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { actionLogoutAsyn } from '../Redux/Actions/actionsLogin';
import { actionListUsertAsyn } from '../Redux/Actions/actionsUsers';
import { Drawer } from 'antd';
import CartItems from './CartItems';

const NavBarB = () => {

    const dispatch = useDispatch();
    const navegar = useNavigate()
    const perfil = getAuth()

    const { users } = useSelector((store) => store.usersStore);
    const [carrito, setCarrito] = useState()


    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const showLargeDrawer = () => {
        setSize('large');
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(actionListUsertAsyn());
        users?.map(p => {
            if (p.UID === perfil.currentUser.uid) {
                setCarrito(p)
            }
        })
    }, []);


    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to="/home" style={{ textDecoration: "none", color: "red" }}>TIENDITA</Link></Navbar.Brand>
                {perfil ? <Button onClick={() => navegar("/profile")}>Profile</Button> : <Button onClick={() => navegar("/login")}>Login</Button>}
                <Button variant="warning" onClick={() => navegar("/administrator")}>Administrador</Button>
                <Button variant="danger" onClick={() => dispatch(actionLogoutAsyn())}>LogOut</Button>
                <Button variant="danger" onClick={() => navegar("/search")}>Search</Button>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Brand style={{display: "flex", alignItems: "center", gap: 10}}>
                        <img style={{ width: 20, height: 20}} alt='logoUbicacion' src='https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613340/reto1/icons/m2obn4yiyegfje2dvpmw.png'></img>
                        {carrito?.address ? carrito?.address : "Sin dereccion asignada"}
                    </Navbar.Brand>
                    <div onClick={showLargeDrawer} style={{ backgroundColor: "#2BBF6D", padding: "5px 20px", display: "flex", alignItems: "center", borderRadius: 10, gap: 6, cursor: "pointer"}}>
                        <img alt='cartLogo' style={{width: 30, height: 30}} src='https://res.cloudinary.com/dlwr6vxib/image/upload/v1705961405/Guajolota/Group_66_ughrn8.png'></img>
                        <p style={{ margin: 0, color: "white" }}>{carrito?.cart ? (carrito?.cart).length : 0}</p>
                    </div>
                </Navbar.Collapse>
                <Drawer
                    title={`Entregar en: ${carrito?.address ? carrito?.address : "Sin dereccion asignada"}`}
                    placement="right"
                    size={size}
                    onClose={onClose}
                    open={open}
                >
                    {carrito?.cart ? <CartItems/> :
                        <div style={{height: "100%", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
                            <img style={{width: 250, height: 193}} alt='noItemsCart' src='https://res.cloudinary.com/dlwr6vxib/image/upload/v1708552829/Guajolota/Family_Values_Shopping_agomjw.png'></img>
                            <h3>Tu canasta esta vacía</h3>
                            <Button style={{backgroundColor: "#0AC763"}} >Agregar productos</Button>
                        </div>
                    }
                </Drawer>
            </Container>
        </Navbar>
    )
}

export default NavBarB