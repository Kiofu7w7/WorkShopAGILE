import React from "react";
import { useDispatch } from "react-redux";
import useForm from "../Hooks/useForm";
import { actionAddproductAsyn } from "../Redux/Actions/actionProducts";
import { getAuth } from "firebase/auth";
import { FileUpload } from "../Helpers/FileUpload";

const AddProducts = () => {
  const perfil = getAuth();

  const dispatch = useDispatch();
  const [formValue, handleInputChange, reset] = useForm({
    name: "",
    category: "",
    price: "",
    des: "",
    discount: "",
    stock: "",
    owner: perfil.currentUser.uid,
    url_img:
      "",
  });

  //CAMBIAR LA URL POR LA QUE DE CLOUDINARY

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
    let obj = {
      id: Math.floor(Math.random() * 200),
      name: formValue.name,
      category: formValue.category,
      price: formValue.price,
      description: formValue.des,
      discount: formValue.discount,
      sells: "0",
      stock: formValue.stock,
      owner: formValue.owner,
      ratings: {
        starts1: "0",
        starts2: "0",
        starts3: "0",
        starts4: "0",
        starts5: "0",
      },
      url_img: formValue.url_img,
    };
    dispatch(actionAddproductAsyn(obj));
    reset();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    FileUpload(file)
      .then((resp) => (formValue.url_img = resp))
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      <h1>CREAR</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="imagen"
        //   accept="*/jpg"
          placeholder="Ingresar imagen.jpg"
          onChange={handleFileChange}
        />
        <h3>Nombre del producto</h3>
        <input
          placeholder="papitas de limon"
          name="name"
          value={formValue.name}
          onChange={handleInputChange}
        />
        <h3>Categoria del producto</h3>
        <input
            placeholder="Verdura"
            name="category"
            value={formValue.category}
            onChange={handleInputChange}
        />
        <h3>Precio del producto</h3>
        <input
          placeholder="3000"
          name="price"
          value={formValue.price}
          onChange={handleInputChange}
        />
        <h3>Descripcion del producto</h3>
        <input
          placeholder="unas papitas :v"
          name="des"
          value={formValue.des}
          onChange={handleInputChange}
        />
        <h3>Descuento del producto en %</h3>
        <input
          placeholder="0"
          name="discount"
          value={formValue.discount}
          onChange={handleInputChange}
        />
        <h3>Stock del producto</h3>
        <input
          placeholder="0"
          name="stock"
          value={formValue.stock}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AddProducts;
