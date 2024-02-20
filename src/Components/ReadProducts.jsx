import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteProductAsyn, actionListproductAsyn } from '../Redux/Actions/actionProducts';
import EditProducts from './EditProducts';

const ReadProducts = () => {

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.productsStore);
    const [show, setShow] = useState(false);
    const [selectData, setSelectData] = useState();
    const handleShow = (p) => {
        setSelectData(p);
        setShow(!show);
    };


    useEffect(() => {
        dispatch(actionListproductAsyn());
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
        const averageRating = (totalRatingValue / totalRatingsCount) || 0;
        return averageRating.toFixed(1);
    };

  return (
    <div>
        <h1>LEER, BORRAR, EDITAR</h1>
        {products?.map((p, index) => (
            <div style={{border: "2px solid black", margin: "20px 0", padding: 20}} key={index}>
                <img alt='imagen producto' src={p.url_img} style={{width: 500, height: 300}}></img>
                <h3>name: {p.name}</h3>
                <p>category: {p.category}</p>
                <p>price: {p.price}</p>
                <p>owner: {p.owner}</p>
                <p>discount: {p.discount}</p>
                <p>sells: {p.sells}</p>
                <p> stock: {p.stock}</p>
                <p>Average rating: {calculateAverageRating(p)}</p>
                {/* ESTO DE ABAJO ES PARA LA EDICION O ELIMINACION */}
                {/* ELIMINAR */}
                <button onClick={() => dispatch(actionDeleteProductAsyn(p.id))}>
                    X
                </button>
                {/* EDITAR */}
                <button variant="primary" onClick={() => handleShow(p)}>
                    Edit
                </button>
                {show && selectData !== "undefined" && (
                    <EditProducts datos={selectData} />
                )}
            </div>
        ))}
    </div>
  )
}

export default ReadProducts