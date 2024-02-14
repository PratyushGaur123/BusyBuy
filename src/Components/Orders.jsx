import { onSnapshot, doc, or } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseInit";
import { useUserContext } from "../CustomUserContext";
import "../static/OrderPage.css";
import { useNavigate } from "react-router-dom";

function Orders(){

    const {user} = useUserContext();
    const [orders, setOrders] = useState([]);
    const navigation = useNavigate();


    useEffect(()=>{
        if(!user){
            navigation("/");
        }
    })

    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot)=>{
            try {
                const data = snapshot.data();
                const orders = data.orders;
                setOrders(orders);
            } catch (error) {
                console.log("NO SUCH DOCUMENT FOUND!");
            }
        });
    }, []);

    return (
        <> 
          <div>
            <h1 className="order-heading-center">Your Orders</h1>
            {orders.map( (order, index)=>(
                <div className="order-container" key={index}>
                <h2 className="order-heading"> Ordered On: {order.date} </h2>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.cartItems.map( (cartItem, index)=>(
                            <>
                            <tr>
                                <td> {cartItem.product.title} </td>
                                <td> ${cartItem.product.price} </td>
                                <td> {cartItem.quantity} </td>
                                <td> ${ parseFloat(cartItem.quantity * cartItem.product.price).toFixed(2)} </td>
                            </tr>
                            
                            </>
                        ) )
                        }
                    </tbody>
                    <tr className="order-total"> ${order.totalAmount} </tr>
                </table>
            </div>
            ) )}
        </div>
         </>
    )
}

export default Orders;