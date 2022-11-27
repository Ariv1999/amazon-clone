import Header from './Header'
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './Firebase'
import { onAuthStateChanged } from "firebase/auth"
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const stripePromise = loadStripe('pk_test_51M6b9sSJYlELxv3TjVJZbmfuzcL3x2MoPXrr7vOtqC37gEay85FFtSBBjQ86dB9SbBPPJIUCf1UFToONn0vGAf4k00wwcEvdkK')
function App() {
  const[{}, dispatch] = useStateValue();

  useEffect(()=>{
    onAuthStateChanged(auth, authUser => {
      console.log('The user is >> ',authUser)
      if(authUser){
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path='/' element={
          <Home />}/>
          <Route path='/login' element={
          <Login />}/>
          <Route path='/checkout' element={
            <Checkout /> }/>
          <Route path='/payment' element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
             }/>
          <Route path='/orders' element={
           <Orders /> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
