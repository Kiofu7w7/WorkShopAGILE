import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionListproductAsyn } from '../Redux/Actions/actionProducts';
import { Button } from 'react-bootstrap';
import { actionAddCartItemAsyn, actionListUsertAsyn } from '../Redux/Actions/actionsUsers';
import { getAuth } from 'firebase/auth';

const CartItems = () => {

    const user = getAuth()
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.productsStore);
    const [carrito, setCarrito] = useState()
    const { users } = useSelector((store) => store.usersStore);
    const [reload, setReload] = useState(false)



    const modificar = (idProduct, cant) => {
        const obj = {
            idUser: user.currentUser.uid,
            idProduct: idProduct,
            amount: cant
        }
        dispatch(actionAddCartItemAsyn(obj)).then(() => {
            setReload(!reload);
        });
    }

    useEffect(() => {
        dispatch(actionListproductAsyn());
        dispatch(actionListUsertAsyn());
        users?.map(p => {
            if (p.UID === user.currentUser.uid) {
                setCarrito(p)
            }
        })
    }, [reload]);

    const buscar = (pid, cant) => {
        const productoReturn = products.find((p) => p.id === pid)
        return (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0" }}>
                <div style={{ display: "flex", gap: 50 }} >
                    <img style={{ width: 64, height: 64 }} alt='imgProducto' src={productoReturn.url_img}></img>
                    <div>
                        <h4>{productoReturn.name}</h4>
                        <h4>${productoReturn.price}</h4>
                    </div>
                </div>
                <div style={{ display: "flex", padding: 10, gap: 10, alignItems: "center" }}>
                    <Button onClick={() => modificar(productoReturn.id, -1)} variant="outline-dark">-</Button>
                    <p style={{ margin: 0 }}>Cantidad: {cant}</p>
                    <Button onClick={() => modificar(productoReturn.id, 1)} variant="outline-dark">+</Button>
                </div>
            </div>
        )
    }


    return (
        <div>
            {carrito?.cart.map((i, index) => (
                <div key={index}>
                    {buscar(i.idProduct, i.cantidad)}
                </div>
            ))}
        </div>
    )
}

export default CartItems