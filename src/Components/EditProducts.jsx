import { getAuth } from 'firebase/auth';
import React from 'react'
import { useDispatch } from 'react-redux';
import useForm from '../Hooks/useForm';
import { actionEditProductAsyn } from '../Redux/Actions/actionProducts';

const EditProducts = ({ datos }) => {

    const perfil = getAuth()

    const dispatch = useDispatch();
    const [formValue, handleInputChange, reset] = useForm({
        name: datos.name,
        price: datos.price,
        des: datos.description,
        discount: datos.discount,
        sells: datos.sells,
        stock: datos.stock,
        owner: datos.owner,
        ratings: datos.ratings,
        url_img: datos.url_img
    });

    //CAMBIAR LA URL POR LA QUE DE CLOUDINARY

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValue);
        let obj = {
            id: datos.id,
            name: formValue.name,
            price: formValue.price,
            description: formValue.des,
            discount: formValue.discount,
            sells: formValue.sells,
            stock: formValue.stock,
            owner: formValue.owner,
            ratings: formValue.ratings,
            url_img: formValue.url_img
        };
        dispatch(actionEditProductAsyn(obj));
        reset();
    };

    return (
        <div>
            <h1>Editar</h1>
            <form onSubmit={handleSubmit}>
                <h3>Nombre del producto</h3>
                <input placeholder="papitas de limon"
                    name="name"
                    value={formValue.name}
                    onChange={handleInputChange} />
                <h3>Precio del producto</h3>
                <input placeholder="3000"
                    name="price"
                    value={formValue.price}
                    onChange={handleInputChange} />
                <h3>Descripcion del producto</h3>
                <input placeholder="unas papitas :v"
                    name="des"
                    value={formValue.des}
                    onChange={handleInputChange} />
                <h3>Descuento del producto en %</h3>
                <input placeholder="0"
                    name="discount"
                    value={formValue.discount}
                    onChange={handleInputChange} />
                <h3>Stock del producto</h3>
                <input placeholder="0"
                    name="stock"
                    value={formValue.stock}
                    onChange={handleInputChange} />
                <br />
                <button type='submit'>Editar Producto</button>
            </form>
        </div>
    )
}

export default EditProducts