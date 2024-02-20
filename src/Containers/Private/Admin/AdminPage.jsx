import React from 'react'
import AddProducts from '../../../Components/AddProducts'
import ReadProducts from '../../../Components/ReadProducts'

const AdminPage = () => {


  return (
    <div>
        <div>
            <h1>PRODUCTOS</h1>
            <div style={{display: 'flex', gap: 20}}>
                <AddProducts/>
                <ReadProducts/>
            </div>
        </div>
    </div>
  )
}

export default AdminPage