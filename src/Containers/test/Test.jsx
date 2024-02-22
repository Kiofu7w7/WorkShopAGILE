import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actionAddCartItemAsyn, actionListUsertAsyn } from '../../Redux/Actions/actionsUsers'
import { getAuth } from 'firebase/auth'

const Test = () => {


  //obtener usuarios y encontrar el carrito personal
  const user = getAuth()
  const dispatch = useDispatch()
  const { users } = useSelector((store) => store.usersStore);
  const [carrito, setCarrito] = useState()

  useEffect(() => {
    dispatch(actionListUsertAsyn());
  }, []);

  const asd = () => {
    users.map(p => {
      if (p.UID === user.currentUser.uid) {
        setCarrito(p)
      }
    })
  }

  const abc = () => {

    // SOLO HACE FALTA RECOPILAR LA ID DEL PRODUCTO Y LA CANTIDAD, EL USER ID SE CONSIGUE DE IGUAL NAMERA QUE ACA
    // SI SE QUIERE SUMAS COLOCAR NUMERO POSITIVO SI SE QUIERE RESTAR PONER EN NEGATIVO 2 O -2
    const obj = {
      idUser: user.currentUser.uid,
      idProduct: 146,
      amount: 6 
    }
    dispatch(actionAddCartItemAsyn(obj))
  }

  console.log(users)

  return (
    <div>
      <Button onClick={() => asd()}>buscar propio</Button>
      <Button onClick={() => abc()}>AGREGAR UN PRODUCTO</Button>
      <p>{JSON.stringify(carrito)}</p>
    </div>
  )
}

export default Test