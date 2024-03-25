import React from 'react'
import Navbars from '../../../Components/User/Navbar/Navbars'
import ShoppingCart from '../../../Components/User/Cart/ShoppingCart'

function CartView() {
  return (
    <div className='dark:text-white bg-gray-200 dark:bg-black'>
    <Navbars />
    <div className="px-2 lg:px-0">
      <div className="overflow-x-auto">
        <div className="mx-auto">
          <div className="max-w-5/6 mx-auto">
            <ShoppingCart/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CartView
