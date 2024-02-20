import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { typesLogin } from "../Types/types";

export const actionRegisterAsync = (email, pass, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
            .then(async ({ user }) => {
                await updateProfile(auth.currentUser, { displayName: name, address: "calle 22#22-22" });
                dispatch(actionRegisterSync(name, email, pass));
            })
            .catch((error) => {
                console.warn("error", error);
            });
    };
};

export const actionRegisterSync = (name, email, pass) => {
    console.log("Usuario Agregado ");
    return {
        type: typesLogin.register,
        payload: { name, email, pass },
    };
};