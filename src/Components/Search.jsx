import { useFormik } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { actionSearchProductAsyn } from "../Redux/Actions/actionProducts";


const Search = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            search: "",
        },
        validationSchema: Yup.object({
            search: Yup.string().required("Este campo es requerido"),
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(actionSearchProductAsyn(values.search))
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input
                    name="search"
                    placeholder="Buscar Producto"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                    error={formik.touched.search && Boolean(formik.errors.search)}
                    helperText={formik.touched.search && formik.errors.search}
                />

                <Button type="submit">Search</Button>
            </form>
        </div>
    );
};

export default Search;