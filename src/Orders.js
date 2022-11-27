import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from './Firebase';
import Order from './Order';
import './Orders.css'
import { useStateValue } from './StateProvider'

export default function Orders() {
  const [{basket, user}, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() =>{
    if(user){
      const refData = doc(db, 'users', user?.uid);
      const order = query(collection(refData, 'orders'), orderBy('created','desc'));
      onSnapshot(order, (snapShot)=>{
        setOrders(snapShot.docs.map((doc)=>({
          id:doc.id,
          data:doc.data()
        })))
      });
    }else{
      setOrders([]);
    }
    
  },[user]);

  return (
    <div className="orders">
        <h1>Your orders</h1>
        
        <div className="orders__order">
          {orders?.map((order)=>(
            <Order order={order} />
          ))}
        </div>
    </div>
  )
}
