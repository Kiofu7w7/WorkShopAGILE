import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import NavBarB from "../../Components/NavBarB";
import { actionListproductAsyn } from "../../Redux/Actions/actionProducts";
import { Badge, CloseButton, Toast, ToastContainer } from "react-bootstrap";
import "../../Styles/stylesHome.css"
import { getAuth } from "firebase/auth";
import { actionAddCartItemAsyn, actionListUsertAsyn } from "../../Redux/Actions/actionsUsers";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.productsStore);
  const [cant, setCant] = useState(1)
  const user = getAuth()

  useEffect(() => {
    dispatch(actionListproductAsyn());
    dispatch(actionListUsertAsyn());
  }, []);

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
  const [showToast, setShowToast] = useState(false)
  const handleClose = () => {setShow(false); setCant(1)};
  const handleShow = () => setShow(true);

  const [seleccion, setSeleccion] = useState();
  const descProdModal = (p) => {
    console.log(p);
    setSeleccion(p);
    handleShow();
  };

  const calculateDiscountedPrice = (product) => {
    const discount = product.discount / 100; // Convierte el porcentaje a decimal
    const discountedPrice = product.price - (product.price * discount);
    return discountedPrice.toFixed(2);
  };

  const modificaCant = (num) => {
    if (num === -1 && cant !== 1) {
      setCant(cant + num)
    }
    if (num === 1) {
      setCant(cant + 1)
    }
  }

  const comprar = (idP, cantidad) => {
    const obj = {
      idUser: user.currentUser.uid,
      idProduct: idP,
      amount: cantidad
    }
    dispatch(actionAddCartItemAsyn(obj))
    handleClose()
    setShowToast(true)
  }

  return (
    <div>
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000} 
          autohide
          bg="success"
          className="d-inline-block m-1"
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Tiendita</strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body style={{color: "white"}}>Producto agregado con éxito!</Toast.Body>
        </Toast>
      </ToastContainer>
      <NavBarB />
      <div style={{ padding: 30 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          Ofertas
          <div style={{ display: "flex", gap: 30, flexWrap: "nowrap", overflowX: "auto", scrollBehavior: "smooth" }}>
            {products?.map((p, index) => {
              if (p.discount !== 0) { //FALTA ARREGLAR QUE SOLO RECIBA NUMEROS
                console.log(p.discount)
                return (

                  <div
                    key={index}
                    onClick={() => {
                      descProdModal(p);
                    }}
                  >
                    <Card style={{ width: "194px", height: 418, border: "none" }}>
                      <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        {p.discount && <Badge bg="none" style={{ color: "#5E18BB", backgroundColor: "#F0E3FE", width: 50 }}>%{p.discount}</Badge>}
                        <Card.Img variant="top" src={p.url_img} />
                        <Card.Title style={{ display: "flex", alignItems: "center" }}>
                          ${calculateDiscountedPrice(p)}
                          {p.discount && (
                            <span className="price-original" style={{ textDecoration: "line-through", opacity: 0.6, marginLeft: 10, backgroundColor: "#f0f0f0", padding: "2px 5px" }}>
                              ${p.price}/kg
                            </span>
                          )}
                        </Card.Title>
                        <Card.Text>{p.description}</Card.Text>
                        <Button style={{ backgroundColor: "#0AC763", border: "none" }}>Agregar</Button>
                      </Card.Body>
                    </Card>
                  </div>

                )
              }
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          Los más populares
          <div style={{ display: "flex", gap: 30, flexWrap: "nowrap", overflowX: "auto", scrollBehavior: "smooth" }}>
            {products?.sort((a, b) => b.sells - a.sells).map((p, index) => (

              <div
                key={index}
                onClick={() => {
                  descProdModal(p);
                }}
              >
                <Card style={{ width: "194px", height: 418, border: "none" }}>
                  <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    {p.discount && <Badge bg="none" style={{ color: "#5E18BB", backgroundColor: "#F0E3FE", width: 50 }}>%{p.discount}</Badge>}
                    <Card.Img variant="top" src={p.url_img} />
                    <Card.Title style={{ display: "flex", alignItems: "center" }}>
                      ${calculateDiscountedPrice(p)}
                      {p.discount && (
                        <span className="price-original" style={{ textDecoration: "line-through", opacity: 0.6, marginLeft: 10, backgroundColor: "#f0f0f0", padding: "2px 5px" }}>
                          ${p.price}/kg
                        </span>
                      )}
                    </Card.Title>
                    <Card.Text>{p.description}</Card.Text>
                    <Button style={{ backgroundColor: "#0AC763", border: "none" }}>Agregar</Button>
                  </Card.Body>
                </Card>
              </div>

            ))}
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          size="xl"
          backdrop="static"
          keyboard={false}
        >

          <Modal.Body>
            <img style={{ width: 200 }} src={seleccion?.url_img} alt="" />
            <CloseButton onClick={handleClose} />
            <h1>{seleccion?.name}</h1>
            <h1>{seleccion?.price}/kg</h1>
            <h5>Precios con IVA incluido</h5>
            {seleccion && (seleccion.category === "Verdura" || seleccion.category === "Fruta") ? (
              <div>
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
              </div>
            ) : null}
            <Button onClick={() => { modificaCant(-1) }} variant="outline-dark">-</Button>
            <p style={{ margin: 0 }}>Cantidad: {cant}</p>
            <Button onClick={() => { modificaCant(1) }} variant="outline-dark">+</Button>
            <Button onClick={()=>{comprar(seleccion.id, cant)}} variant="primary">Agregar</Button>

            <div style={{ display: "flex", gap: 30 }}>
              {products?.map((p, index) => {
                if (p.category === seleccion?.category) {
                  if (p.id !== seleccion.id) {
                    return (<div
                      key={index}
                      onClick={() => {
                        descProdModal(p);
                      }}
                    >
                      <Card style={{ width: "194px", height: 418, border: "none" }}>
                        <Card.Body style={{}}>
                          {p.discount && <Badge bg="none" style={{ color: "#5E18BB", backgroundColor: "#F0E3FE" }}>%{p.discount}</Badge>}
                          <Card.Img variant="top" src={p.url_img} />
                          <Card.Title style={{ display: "flex", alignItems: "center" }}>
                            ${calculateDiscountedPrice(p)}
                            {p.discount && (
                              <span className="price-original" style={{ textDecoration: "line-through", opacity: 0.6, marginLeft: 10, backgroundColor: "#f0f0f0", padding: "2px 5px" }}>
                                ${p.price}/kg
                              </span>
                            )}
                          </Card.Title>
                          <Card.Text>{p.description}</Card.Text>
                          <Button style={{ backgroundColor: "#0AC763", border: "none" }}>Agregar</Button>
                        </Card.Body>
                      </Card>
                    </div>)
                  }
                }
              })}
            </div>

          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
