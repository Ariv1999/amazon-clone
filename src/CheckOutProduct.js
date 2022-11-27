import React from 'react'
import './CheckOutProduct.css'
import { useStateValue } from './StateProvider';

function CheckOutProduct({id, title, price, image, rating, hideButton}) {
    const [{basket}, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id
        })
    }
  return (
    <div className="checkoutProduct">
        <img className='checkoutProduct__image' src={image} alt="product" />
        <div className="checkoutProduct__info">
            <p className='checkoutProduct__title'>{title}</p>
            <p className="checkoutProduct__price">
                <small>₹</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
                {Array(rating).fill().map(()=>(
                    <p>⭐</p>
                ))}
            </div>
            {!hideButton&&(
                <button onClick={removeFromBasket}>Remove from Basket</button>
            )}
            
        </div>

    </div>
  )
}

export default CheckOutProduct