import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { actionLogoutAsyn } from '../../Redux/Actions/actionsLogin';
import NavBarB from '../../Components/NavBarB';
import { actionListproductAsyn } from "../../Redux/Actions/actionProducts"

const Home = () => {

  const dispatch = useDispatch();
  const navegar = useNavigate()
  const { products } = useSelector((store) => store.productsStore);

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

  const descProdModal = (p) => {
    console.log(p)
  }

  return (
    <div>
      <NavBarB/>
      {products?.map((p, index) => ( 
        <div key={index} onClick={()=>{descProdModal(p)}}>
          <img style={{width: 200}} alt='' src={p.url_img}></img>
          <h3>{p.name}</h3>
          <p>Precio: ${p.price}</p>
          <p>Categoria: {p.category}</p>
          <p>Descripcion: {p.description}</p>
          <p>Descuento: {p.discount}</p>
          <p>Stock: {p.stock}</p>
          <p>Ventas: {p.sells}</p>
          <p>Ventas: {p.sells}</p>
          <p>Average rating: {calculateAverageRating(p)}</p>
        </div> 
      ))}

    </div>
  )
}

export default Home