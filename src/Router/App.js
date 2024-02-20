import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../Containers/Public/Login'
import PublicRouter from "./PublicRouter";
import Home from '../Containers/Public/Home'
import PrivateRouter from "./PrivateRouter";
import DashBoard from "./DashBoard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Firebase/firebaseConfig";
import Register from "../Containers/Public/Register";

function App() {

  const [user, setuser] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth?.uid) {
        setuser(true);
      } else setuser(false);
    });
  }, [setuser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route
          path="/login"
          element={
            <PublicRouter isAutentication={user}>
              <Login/>
            </PublicRouter>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouter isAutentication={user}>
              <Register />
            </PublicRouter>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRouter isAutentication={user}>
              <DashBoard />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
