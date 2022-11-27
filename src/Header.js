import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {Link} from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";

function Header() {
  const [{basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    auth.signOut()
  }
  return (
    <div className="header">
      <Link to='/'>
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>
      

      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"}>
        <div onClick={handleAuthentication}
        className="header__options">
          <span className="option__lineOne">Hello {user?user.email:'Guest'}</span>
          <span className="option__lineTwo">{user?'Sign Out':'Sign In'}</span>
        </div>
        </Link>
        <Link to='/orders'>
          <div className="header__options">
            <span className="option__lineOne">Returns</span>
            <span className="option__lineTwo">& Order</span>
          </div>
        </Link>
        <div className="header__options">
          <span className="option__lineOne">Your</span>
          <span className="option__lineTwo">Prime</span>
        </div>
        <Link to='/checkout'>
          <div className="header__Basket">
            <ShoppingBasketIcon />
            <span className="option__lineTwo shoppingCount">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
