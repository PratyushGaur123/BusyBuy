import React from 'react';
import '../static/Item.css'; // Import your external stylesheet
import { useUserContext } from '../CustomUserContext';
import { useNavigate } from 'react-router-dom';


const Item = (props) => {
  const {user, handleAddCart} = useUserContext();
  const navigation = useNavigate();

  function handleNavigation(){
    navigation("signin");
  }

  return (
    (
      props.products.map((product) => (
        <div className="product-container">
          <div className="product-image-container">
            <img className="item-image" src={product.image} alt="img" />
          </div>
          <div className="product-details">
            <div className="product-name"> <p>{product.title}</p> </div>
            <div className="product-options"> <p> ${product.price} </p></div>
            {user ? <button className="add-btn" onClick={()=> handleAddCart(product)}>Add to Cart</button> : <button className="add-btn" onClick={handleNavigation}>Add to Cart</button>}
          </div>
        </div>
      ))
    )
  )
};

export default Item;
