import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { typesUsers } from "../Types/types";
import { dataBase } from "../../Firebase/firebaseConfig"
// ------------------Listar---------------------
export const actionListUsertAsyn = () => {
    const pro = [];
    return async (dispatch) => {
        const productosListar = await getDocs(collection(dataBase, "Users"));
        productosListar.forEach((p) => {
            pro.push({
                ...p.data(),
            });
        });
        dispatch(actionListUserSyn(pro));
    };
};

export const actionListUserSyn = (payload) => {
    return {
        type: typesUsers.list,
        payload,
    };
};
// ------------------Agregar---------------------
export const actionAddUserAsyn = (payload) => {
    return async (dispatch) => {
        await addDoc(collection(dataBase, "Users"), payload)
            .then((resp) => {
                dispatch(actionAddUserSyn(payload));
                dispatch(actionListUsertAsyn());
            })
            .catch((e) => {
                console.error("Error adding document: ", e);
            });
    };
};
export const actionAddUserSyn = (payload) => {
    return {
        type: typesUsers.add,
        payload,
    };
};

// ------------------Editar---------------------
export const actionEditUserAsyn = (payload) => {
    return async (dispatch) => {
        let uid = "";
        const collectionP = collection(dataBase, "Users");
        const q = query(collectionP, where("id", "==", payload.id));
        const datosQ = await getDocs(q);
        datosQ.forEach((docu) => {
            uid = docu.id;
        });
        const docRef = doc(dataBase, "Users", uid);
        await updateDoc(docRef, payload)
            .then((resp) => {
                dispatch(actionEditUserSyn(payload));
                dispatch(actionListUsertAsyn());
            })
            .catch((error) => console.log(error));
    };
};

export const actionEditUserSyn = (payload) => {
    return {
        type: typesUsers.edit,
        payload,
    };
};

// ----------------Eliminar Productos-----------------------

export const actionDeleteUserAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Users");
        const q = query(productosCollection, where("id", "==", payload));
        const dataQ = await getDocs(q);
        console.log(dataQ);

        dataQ.forEach((docu) => {
            deleteDoc(doc(dataBase, "Users", docu.id));
        });
        dispatch(actionDeleteUserSyn(payload));
    };
};

export const actionDeleteUserSyn = (payload) => {
    return {
        type: typesUsers.delete,
        payload,
    };
};


// ----------------Add carrito Perfil-----------------------
//requiere enviar el UID, el ID del producto y la cantidad {idUser: user.currenUser.UID, idProduct: 5, amount: 4}

export const actionAddCartItemAsyn = (payload) => {
    return async (dispatch) => {
        const idUser = payload.idUser;
        const idProduct = payload.idProduct;
        const amount = payload.amount;
        let uid;
        try {
            const userDocRef = query(
                collection(dataBase, "Users"),
                where("UID", "==", idUser)
            );

            const datosQ = await getDocs(userDocRef);
            datosQ.forEach((docu) => {
                uid = docu.id;
            });
            const docRef = doc(dataBase, "Users", uid);
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data();
            if (!docData.cart) {
                docData.cart = [];
            }

            const itemIndex = docData.cart.findIndex(item => item.idProduct === idProduct);

            if (itemIndex !== -1) {
                // Producto encontrado en el carrito
                if (amount > 0) {
                    // Agregar
                    docData.cart[itemIndex].cantidad += amount;
                } else if (amount < 0) {
                    // Restar
                    docData.cart[itemIndex].cantidad += amount;

                    if (docData.cart[itemIndex].cantidad <= 0) {
                        // Eliminar si la cantidad llega a 0
                        docData.cart.splice(itemIndex, 1);
                    }
                }
            } else if (amount > 0) {
                // Producto nuevo y cantidad positiva, agregarlo
                docData.cart.push({ idProduct, cantidad: amount });
            }


            await updateDoc(docRef, docData).then((resp) => {
                dispatch(actionAddCartItemSyn(payload));
                dispatch(actionListUsertAsyn());
            })
            .catch((e) => {
                console.error(e)
            });

            
            
        } catch (error) {
            console.log(error)
        }
    };
};

export const actionAddCartItemSyn = (payload) => {
    return {
        type: typesUsers.addToCart,
        payload,
    };
};