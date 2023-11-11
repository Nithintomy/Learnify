  import React, { useEffect, useState } from 'react'
  import axios from 'axios'
  import { UserBaseUrl } from '../../../Api';
  import { useDispatch, useSelector } from 'react-redux';
  import { selectUser } from '../../../features/userSlice/userSlice';
  import { updateCartCount } from '../../../features/userSlice/cartSlice';
  import PayButton from '../PayButton/PayButton';
  import { RingLoader } from 'react-spinners';
  import { Course } from '../../../features/tutorSlice/courseSlice';

  interface CartItem {
    _id: string;
    quantity: number;
    course: Course; // Make sure Course is imported and properly defined
  }
  

  function Cart() {

      const user = useSelector(selectUser)
      const userId =user?.user?._id;
      const dispatch = useDispatch();
      const [cartItems,setCartItems] =useState<CartItem[]>([])
      const [loading, setLoading] = useState(true);

      console.log(userId,"user ondo")

      useEffect(() => {

          axios.get(`${UserBaseUrl}/get-cart-items/${userId}`)
          .then((response)=>{
              console.log(response.data,"response From get")
              // localStorage.setItem('cartData', JSON.stringify(response.data));
              //  const cartData = JSON.parse(localStorage.getItem('cartData') || '[]');
              setCartItems(response.data)
              setLoading(false)
              dispatch(updateCartCount(response.data.length))
              
          })
          .catch((error)=>{
              console.log(error,"errr")
          })
      
      }, [])

      const handleDelete =(cartItemId:any)=>{
        axios.delete(`${UserBaseUrl}/remove-from-cart/${cartItemId}`)
        .then((response)=>{
          console.log(response.data,"deleted Successfully")
          
          dispatch(updateCartCount(response.data.length));

          setCartItems((prevCartItems)=>prevCartItems.filter((item)=>item?._id !== cartItemId))
        })
        .catch((error)=>{
          console.error("error", error);
        })
        
      }
      if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <RingLoader loading={true} color="#000000" speedMultiplier={1} size={150} />
      </div>
      }
      
    
      return (
          <div className="h-screen bg-gray-100 pt-20 dark:bg-black">
            <h1 className="mb-10 text-center text-4xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
            {cartItems.length === 0 ? (
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center m-14">No courses Added in the cart</h1>
              
            ) : (
              cartItems.map((item, index) => (
          
                <div key={index} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={item?.course?.photo}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40 h-24"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">{item?.course?.courseName}</h2>
                      <p className="mt-1 text-xs text-gray-700">{item?.course?.coursedescription}</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                          {' '}
                          -{' '}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={item?.quantity}
                          min="1"
                        />
                        <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                          {' '}
                          +{' '}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">$ {item?.course?.courseFee}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => handleDelete(item?._id)}
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                ))
                )}

              </div>
              {/* Sub total */}
              {cartItems.length > 0 && (
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700"> $ {cartItems.reduce((total, item) => total + item?.course?.courseFee * item?.quantity, 0).toFixed(2)}</p>
                </div>
              
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div>
                    <p className="mb-1 text-lg font-bold">$ {cartItems.reduce((total, item) => total + item?.course?.courseFee * item?.quantity, 0).toFixed(2)}</p>
                    <p className="text-sm text-gray-700">including GST</p>
                  </div>
                </div>
                <PayButton cartItems={cartItems}  />
              </div>
              )}  
            </div>
          </div>
        );
  }

  export default Cart

