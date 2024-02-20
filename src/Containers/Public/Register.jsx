import { Field, Form, Formik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { actionRegisterAsync } from '../../Redux/Actions/actionsRegister';

const Register = () => {

    const dispatch = useDispatch();

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "NO cumple con el número min de caracteres")
            .max(50, "Excede el máximo")
            .required("Este campo es requerido"),
        lastName: Yup.string()
            .min(2, "NO cumple con el número min de caracteres")
            .max(50, "Excede el máximo")
            .required("Este campo es requerido"),
        email: Yup.string().email("Invalid email").required("Required"),
        pass: Yup.string()
            .min(6, "pass muy corto")
            .max(10, "Excede el máximo")
            .oneOf([Yup.ref("pass2"), "Los password No coinciden"])
            .required("Required"),
        pass2: Yup.string()
            .min(6, "Pass muy corto")
            .max(10, "Excede el máximo")
            .oneOf([Yup.ref("pass"), "Los password No coinciden"])
            .required("Required"),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    pass: "",
                    pass2: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    dispatch(actionRegisterAsync(values.email, values.pass, (values.firstName + ' ' + values.lastName)));
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <h3>Nombre</h3>
                        <Field name="firstName" />
                        {errors.firstName && touched.firstName ? (
                            <div>{errors.firstName}</div>
                        ) : null}

                        <h3>Apellido</h3>
                        <Field name="lastName" />
                        {errors.lastName && touched.lastName ? (
                            <div>{errors.lastName}</div>
                        ) : null}

                        <h3>Email</h3>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}

                        <h3>Contraseña</h3>
                        <Field name="pass" type="pass" />
                        {errors.pass && touched.email ? <div>{errors.pass}</div> : null}

                        <h3>Confirmar Contraseña</h3>
                        <Field name="pass2" type="pass2" />
                        {errors.pass2 && touched.email ? <div>{errors.pass2}</div> : null}

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register