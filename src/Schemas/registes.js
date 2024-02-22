import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const basicSchema = Yup.object().shape({
    email: Yup.string().email("Entra un correo valido").required("Este campo es obligatorio"),
    nombre: Yup.string().required("Este campo es obligatorio"),
    apellido: Yup.string().required("Este campo es obligatorio"),
    pass: Yup.string().min(5).matches(passwordRules, { message: "una contraseña mas fuerte papi" }).required("Este campo es obligatorio"),
    cpass: Yup.string().oneOf([Yup.ref('pass'), ])
})