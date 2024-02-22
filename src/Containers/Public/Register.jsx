import { Field, Form, Formik, useFormik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { actionRegisterAsync } from '../../Redux/Actions/actionsRegister';

const Register = () => {

    const {values, handleBlur, handleChange} = useFormik({
        initialValues: {
            email: "",
            nombre: "",
            apellido: "",
            pass: "",
            cpass: "",
        }
    })


    return (
        <div>
            <form style={{ display: "flex", flexDirection: "column" }} autoComplete='off'>
                <label>Email</label>
                <input value={values.email} 
                onChange={handleChange}
                id='email'
                type='email'
                placeholder='entre el email' />
                <label>Nombre</label>
                <input value={values.nombre}
                    onChange={handleChange}
                    id='nombre'
                    type='nombre'
                    placeholder='entre el nombre' />
                <label>Apellido</label>
                <input value={values.apellido}
                    onChange={handleChange}
                    id='apellido'
                    type='apellido'
                    placeholder='Entre el Apellido' />
                <label>Contraseña</label>
                <input value={values.pass}
                    onChange={handleChange}
                    id='pass'
                    type='pass'
                    placeholder='Entre la contraseña' />
                <label>Confirmar contraseña</label>
                <input value={values.cpass}
                    onChange={handleChange}
                    id='cpass'
                    type='cpass'
                    placeholder='Confirme la contraseña' />
                <button type='submit'>ENVIAR</button>
            </form>
        </div>
    )
}

export default Register