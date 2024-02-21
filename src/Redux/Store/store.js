import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import loginReducer from "../Reducers/loginReducers";
import productsReducers from "../Reducers/productsReducers"
import usersReducers from "../Reducers/usersReducers"
import { thunk } from "redux-thunk";

// Configuracion de los middleware para manejar acciones asíncronas con Redux-Thunk
const middleware = [thunk];

// Ojo: solo para el entorno de desarrollo ye sto me permite ver a la extensión de Redux en la consola
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE_ || compose;


const reducers = combineReducers({
    loginStore: loginReducer,
    productsStore: productsReducers,
    usersStore: usersReducers
});

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
);