import { getAuth, updateProfile } from "firebase/auth";
import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const Profile = () => {
  const funcion = async () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: "Santiago Buitrago Giraldo",
      photoURL:
        "https://lh3.googleusercontent.com/a/ACg8ocIGKkrOTisORwBZeUsTeeqVsynijCz6lcUZVo98rjHCmQ=s96-c",
      address: "calle 22#22-33",
    })
      .then(() => {
        console.log(auth);
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nombre"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Usuario"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a Email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="text" placeholder="Contraseña" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Contraseña.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
      <Button onClick={() => funcion()}>actualizar</Button>
      <Button>ver</Button>
    </div>
  );
};

export default Profile;
