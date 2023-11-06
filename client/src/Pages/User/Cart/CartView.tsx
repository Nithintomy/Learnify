import React from 'react'
import Navbar from '../../../Components/User/Navbar/Navbar'
import Cart from '../../../Components/User/Cart/Cart'

function CartView() {
  return (
    <div>
    <Navbar />
    <div className="mt-5 px-2 lg:px-0">
      <div className="overflow-x-auto">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-5/6 mx-auto">
            <Cart/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CartView
