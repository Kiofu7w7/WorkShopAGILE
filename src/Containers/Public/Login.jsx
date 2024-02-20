import React from "react";
import useForm from "../../Hooks/useForm";
import { useDispatch } from "react-redux";
import { actionFacebook, actionGoogle, actionLoginAsyn } from "../../Redux/Actions/actionsLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [formValue, handleInputChange, reset] = useForm({
    email: "",
    pass: "",
  });

  const { email, pass } = formValue;
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(actionLoginAsyn(email, pass));
    reset();
  };
  
  return (
    <div className="divLogin">
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email" onChange={handleInputChange} value={email} />
        <br></br>
        <input type="password" placeholder="Password"  name="pass" onChange={handleInputChange} value={pass} autoComplete="true" />
        <button type="submit">Login</button>
      </form>
      <br></br>
      <p>No tienes cuenta? <Link to="/register">Registrate gratis</Link></p>
      <br></br>
      <button onClick={() => dispatch(actionGoogle())}>GOOGLE</button>
      <button onClick={() => dispatch(actionFacebook())}>FACEBOOK</button>
    </div>
  );
};

export default Login;