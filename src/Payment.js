import './Payment.css';
import React, { useEffect, useState } from 'react'
import { useStateValue } from './StateProvider';
import CheckOutProduct from './CheckOutProduct';
import { Link, useNavigate } from 'react-router-dom'
import {CardElement, useStripe,useElements,} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getTotalPrice } from './reducer';
import axios from './axios';
import { db } from './Firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Payment() {

    const [ {basket, user}, dispatch ] = useStateValue()

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(true);
    const [processing, setProcessing] = useState("")
    const [succeeded, setSucceeded] = useState(false)
    const [clientSecret, setClientSecret] = useState(true);

    const navigator = useNavigate();

    useEffect(()=> {
        const getClientSecret = async () => {
            const response = await axios({
                method:'post',
                url: `/payments/create?total=${getTotalPrice(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])
    console.log("the secrete is >>> " ,clientSecret)
    const handleSubmit = async (event) => {
        // doing crezy submit stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent })=> {

            const setRef = doc(db, 'users', user?.uid);
            const data = doc(setRef, 'orders', paymentIntent.id);
            setDoc(data,{
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            },{marge:true})
            setSucceeded(true);
            setError(null);
            setProcessing(false)

            dispatch({
                type: "EMPTY_BASKET"
            })
            navigator("/orders", {replace: true});

        })
    }

    const handleChange =(e) =>{
        // doing crazy change stuff
        setDisable(e.empty);
        setError(e.error ? e.error.message : "");
    }

  return (

    <div className="payment">
        <div className="payment__container">
            <h1>
                Checkout (
                    <Link to='/checkout'>{basket?.length} items</Link>
                )
            </h1>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>Kolkata, 700029</p>
                    <p>West Bengal, India</p>
                </div>
            </div>

            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment__items">
                {
                    basket.map((item)=>(
                        <CheckOutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))
                }
                </div>
            </div>

            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment__price">
                            <CurrencyFormat renderText={(value)=>(
                                <h3>Order total : {value}</h3>
                            )}
                            decimalScale={2}
                            value={getTotalPrice(basket)}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={"₹"}
                            />
                            
                            <button disabled={processing || disable || succeeded}>
                                <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
