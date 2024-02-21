import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {facebook, google} from '../../Firebase/firebaseConfig'
import { typesLogin } from "../Types/types";
import { actionAddUserAsyn } from "./actionsUsers";

// ------------Iniciando con Usuario y Contraseña---------------------//

export const actionLoginAsyn = (email, pass) => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user, user.displayName, "Bienvenido si estas Registrado");
                dispatch(actionLoginSyn(email, pass));
                // ...
            })
            .catch((error) => {
                console.warn(error, "Usuario NO Autorizado");
            });
    };
};

export const actionLoginSyn = (email, pass) => {
    return {
        type: typesLogin.login,
        payload: { email, pass },
    };
};

// ------------Iniciando con Google-----------------------//
export const actionGoogle = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, google)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token);
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                const obj = {
                    UID: user.uid,
                    cart: [],
                }
                actionAddUserAsyn(obj)
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

// ------------Iniciando con Facebook-----------------------//
export const actionFacebook = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, facebook)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = FacebookAuthProvider.credentialFromError(error);
                console.log(errorMessage)
            });
    };
};


// ------------------------Logout-------------------------------//

export const actionLogoutAsyn = () => {
    return (dispatch) => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                dispatch(actionLogoutSyn);
                console.log("Adios..");
            })
            .catch((error) => {
                console.warn(error);
            });
    };
};

export const actionLogoutSyn = () => {
    return {
        type: typesLogin.logout,
    };
};
