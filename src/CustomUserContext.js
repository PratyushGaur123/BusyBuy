import React, { createContext, useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc, arrayUnion, getDoc, setDoc, increment, arrayRemove } from "firebase/firestore";
import { db } from './firebaseInit';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userContext = createContext();

export function useUserContext() {
    const value = useContext(userContext);
    return value;
}

const CustomUserContext = (props) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);       // initially user is not logged in
    const [name, setName] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [purchaseAmount, setPurchaseAmount] = useState(0);
    const [purchaseLoad, setPurchaseLoad] = useState(false);



    const auth = getAuth();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const User = userCredentials.user;
            setUser(User);
            console.log(User.uid);
            await setDoc(doc(collection(db, "users"), User.uid), {
                name,
                email,
                password,
                myCart: [],
                orders: []
            });
            setEmail("");
            setPassword("");
            toast.success('Sign-Up Successfull');
            
        } catch (error) {
            setError(error.message);
            toast.error('Sign-Up Failed');
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {

            const userCrendtials = await signInWithEmailAndPassword(auth, email, password);
            const actualUser = userCrendtials.user;
            setUser(actualUser);
            console.log(actualUser);
            setEmail("");
            setPassword("");
            toast.success('Logged-In Successfully');
            
        } catch (error) {
            console.log("Error in logging in: ", error);
            setEmail("");
            setPassword("");
            toast.error('Authentication Failed!');
        }
    };

    const handleAddCart = async (product) => {
        const userRef = doc(db, "users", user.uid);
        // console.log(user.uid);
        const userDoc = await getDoc(userRef);
        // console.log(userDoc.data());
        console.log(product);
        const cart = userDoc.data().myCart;
        const index = cart.findIndex((element) => element.product.id === product.id);

        if (index === -1) {
            await updateDoc(userRef, {
                myCart: arrayUnion({ product: product, quantity: 1 })
            });
        } else {
            cart[index].quantity++;
            await updateDoc(userRef, {
                myCart: cart
            });
        }
        toast.success('Item Added Successfully');
        setPurchaseAmount(prevAmount => prevAmount + product.price);
    }

    const handleRemoveCart = async (cartItem) => {

        try {
            const quantity = cartItem.quantity;
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                myCart: arrayRemove(cartItem)
            });
            setPurchaseAmount(prevAmount => prevAmount - quantity * cartItem.product.price);
            toast.success('Item Removed Successfully');
        } catch (error) {
            toast.error('Error in removing the item!');
        }
        
    }

    const updateItemCount = async (itemIndex, val) => {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const cart = userDoc.data().myCart;
        if (val === "plus") {
            cart[itemIndex].quantity++;
            await updateDoc(userRef, {
                myCart: cart
            });
            setPurchaseAmount(prevAmount => prevAmount + cart[itemIndex].product.price);
        }
        else if (val === "minus") {
            setPurchaseAmount(prevAmount => prevAmount - cart[itemIndex].product.price);
            if (cart[itemIndex].quantity === 1) {
                cart.splice(itemIndex, 1);
            }
            else {
                cart[itemIndex].quantity--;
            }
            await updateDoc(userRef, {
                myCart: cart
            });

        }
    }

    const handlePurchase = async (cartItems) => {
            setPurchaseLoad(true);
            const userRef = doc(db, "users", user.uid);
            const totalAmount = parseFloat(purchaseAmount).toFixed(2);
    
            let today = new Date(); 
            let date = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    
            const obj = {
                cartItems: cartItems,
                totalAmount: totalAmount,
                date: date
            }
    
            await updateDoc(userRef, {
                orders: arrayUnion(obj),
                myCart: []
            });
    
            setPurchaseAmount(0);
            toast.success("Purchase Sucessfull");
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success(" Logged-Out Successfully");
            // navigation("/")
        }
        catch (err) {
            console.log("Failed to sign-out: ", err);
            toast.error(" Failed to Log-Out");
        }

    }


    return (
        <userContext.Provider value={{ email, setEmail, password, setPassword, handleSignIn, handleSignUp, handleSignOut, user, name, setName, handleAddCart, cartItems, handleRemoveCart, updateItemCount, purchaseAmount, handlePurchase, purchaseLoad }} >
            {props.children}
        </userContext.Provider>

    );
};
export default CustomUserContext;
