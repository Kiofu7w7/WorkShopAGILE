import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../Containers/Private/Profile'
import Home from '../Containers/Public/Home'
import AdminPage from '../Containers/Private/Admin/AdminPage'

const DashBoard = () => {

  return (
    <>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/administrator' element={<AdminPage />}></Route>
          <Route path='/*'  element={<Navigate to="/home"/>}/>
        </Routes>
    </>
  )
}

export default DashBoard