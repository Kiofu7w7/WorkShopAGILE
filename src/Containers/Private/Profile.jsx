import { Avatar } from "antd";
import { getAuth, updateProfile } from "firebase/auth";
import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FileUpload } from "../../Helpers/FileUpload";
import useForm from "../../Hooks/useForm";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate()
  const auth = getAuth();

  const [formValue, handleInputChange, reset] = useForm({
    name: auth.currentUser.displayName,
    phoneNumber: auth.currentUser.phoneNumber,
    email: auth.currentUser.email,
    photoURL: auth.currentUser.photoURL
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    console.log(formValue)
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: formValue.name,
      phoneNumber: formValue.phoneNumber,
      email: formValue.email,
      photoURL: formValue.photoURL
    }).then(() => {
      navigate("/")
    })
      .catch((error) => {
      });
  };

  console.log(auth.currentUser)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    FileUpload(file)
      .then((resp) => (formValue.photoURL = resp))
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        src={auth.currentUser.photoURL}
      />
      <input
        type="file"
        name="imagen"
        onChange={handleFileChange}
      />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formValue.name}
              placeholder="Nombre"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              required
              type="text"
              name="phoneNumber"
              value={formValue.phoneNumber}
              placeholder="Sin telefono"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                name="email"
                value={formValue.email}
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
                onChange={handleInputChange}
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
        <Button type="submit">actualizar</Button>
      </Form>
      <Button onClick={() => console.log(formValue)}>ver</Button>
    </div>
  );
};

export default Profile;
