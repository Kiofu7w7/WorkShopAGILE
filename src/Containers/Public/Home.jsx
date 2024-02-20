import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { actionLogoutAsyn } from '../../Redux/Actions/actionsLogin';

const Home = () => {

  const dispatch = useDispatch();
  const navegar = useNavigate()

  return (
    <div>
      <button onClick={() => navegar("/")}>HOME</button>
      <button onClick={() => navegar("/login")}>login</button>
      <button onClick={() => navegar("/profile")}>profile</button>
      <button onClick={() => navegar("/administrator")}>administrar</button>
      <button onClick={() => dispatch(actionLogoutAsyn())}>LOG OUT</button>
    </div>
  )
}

export default Home