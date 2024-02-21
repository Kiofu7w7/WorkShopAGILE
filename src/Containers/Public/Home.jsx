import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionLogoutAsyn } from "../../Redux/Actions/actionsLogin";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import NavBarB from "../../Components/NavBarB";

const Home = () => {
  const dispatch = useDispatch();
  const navegar = useNavigate();
  const { products } = useSelector((store) => store.productsStore);

  const calculateAverageRating = (product) => {
    const ratings = product.ratings;
    if (!ratings || Object.keys(ratings).length === 0) {
      return 0;
    }
    let totalRatingValue = 0;
    let totalRatingsCount = 0;

    for (const [ratingValue, ratingCount] of Object.entries(ratings)) {
      const parsedRatingValue = parseInt(ratingValue.substring(6));

      totalRatingValue += parsedRatingValue * parseInt(ratingCount);
      totalRatingsCount += parseInt(ratingCount);
    }
    const averageRating = totalRatingValue / totalRatingsCount || 0;
    return averageRating.toFixed(1);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [seleccion, setSeleccion] = useState();
  const descProdModal = (p) => {
    console.log(p);
    setSeleccion(p);
    handleShow();
  };

  return (
    <div>
      <NavBarB />
      {products?.map((p, index) => (
        <div
          key={index}
          onClick={() => {
            descProdModal(p);
          }}
        >
          <img style={{ width: 200 }} alt="" src={p.url_img}></img>
          <h3>{p.name}</h3>
          <p>Precio: ${p.price}</p>
          <p>Categoria: {p.category}</p>
          <p>Descripcion: {p.description}</p>
          <p>Descuento: {p.discount}</p>
          <p>Stock: {p.stock}</p>
          <p>Ventas: {p.sells}</p>
          <p>Ventas: {p.sells}</p>
          <p>Average rating: {calculateAverageRating(p)}</p>
        </div>
      ))}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{seleccion?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={{ width: 200 }} src={seleccion?.url_img} alt="" />
          <h1>{seleccion?.price}/kg</h1>
          <h5>Precios con IVA incluido</h5>
          <p>
            Peso aproximado por pieza, puede variar de acuerdo al peso real.
          </p>
          <h2>Selecciona la madurez que deseas</h2>
          <Form.Select aria-label="Default select example">
            <option>Por elegir</option>
            <option value="1">Maduro (Para hoy)</option>
            <option value="2">Normal (3-5 dias)</option>
            <option value="3">Verde (7 dias)</option>
          </Form.Select>
          <Button variant="primary">Agregar</Button>
          <Card style={{ width: "18rem" }}>
            <Card.Img src={seleccion?.url_img} />
            <Card.Body>
              <Card.Title>{seleccion?.name}</Card.Title>
              <Card.Text>
                <h3>${seleccion?.price}/kg</h3>
                <p>{seleccion?.description}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
