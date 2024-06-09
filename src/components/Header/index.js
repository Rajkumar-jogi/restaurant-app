import React from 'react'
import {FaCartPlus} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const {restaurantName, cartCount} = props
  return (
    <nav className="nav">
      <h1>{restaurantName}</h1>
      <div className="nav-sub">
        <p className="my-orders-heading">My Orders</p>
        <div className="cart-icon-container">
          <FaCartPlus color="#7d7878" size={34} />
          <p className="cart-count">{cartCount}</p>
        </div>
      </div>
    </nav>
  )
}

export default Header
