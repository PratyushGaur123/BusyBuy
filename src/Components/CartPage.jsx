import { getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUserContext } from "../CustomUserContext";
import { doc } from "firebase/firestore";
import { db } from "../firebaseInit";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../static/CartPage.css"
import minus from "../static/minus.png";
import plus from "../static/plus.png";

function CartPage(){
    const {user_id} = useParams();
    const {handleRemoveCart, updateItemCount, purchaseAmount, handlePurchase, user, purchaseLoad} = useUserContext();
    const [cartItems, setCartItems] = useState([]);
    const amount = parseFloat(purchaseAmount).toFixed(2);
    const navigation = useNavigate();


    useEffect(()=>{
        if(!user){
            navigation("/");
        }
    })
    
    
    useEffect( ()=>{
        const unsub = onSnapshot(doc(db, "users", user_id), (snapshot)=>{
            try {
                const data = snapshot.data()
                const cart = data.myCart;
                setCartItems(cart);
                // console.log(cart);
            } catch (error) {
                console.log("NO SUCH DOCUMENT FOUND!");
            }
        });
    }, [] );
    
    // const purchaseAmount = cartItems.forEach((cartItem)=> purchaseAmount = purchaseAmount + cartItem.quantity*cartItem.product.price)

    return (
        <>
        <aside className="aside-price">
            <p className="purchase-p"> Total Price: ${amount}/-</p>
            <Link to={`/userOrders/${user_id}/orders`} className="purchase-btn" onClick={()=>handlePurchase(cartItems)}> {purchaseLoad ? "Purchasing" : "Purchase"} </Link>

        </aside>
         <div className="product-grid">
            {cartItems.map( (cartItem, index)=> (
                <div className="product-container" key={index}>
                    <div className="image-container">
                        <img src={cartItem.product.image} alt="cart-item" width="100%" height="100%" className="image"/>
                    </div>
                    <div className="details-container">
                        <div className="product-name">
                          <p> {cartItem.product.title} </p> 
                        </div>
                        <div className="product-options">
                            <p className="product-price"> ${cartItem.product.price} </p>
                            <div className="quantity-container">
                                <img src={minus} alt="" className="minus-plus" onClick={()=>updateItemCount(index, "minus")}/>
                                 {cartItem.quantity}
                                <img src={plus} alt="" className="minus-plus" onClick={()=>updateItemCount(index, "plus")} />

                            </div>

                        </div>
                        <button className="remove-btn" onClick={()=> handleRemoveCart(cartItem)}>Remove From Cart </button>

                    </div>

                </div>
            ) )}
            </div> 
        </>
    )
}

export default CartPage;