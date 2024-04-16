import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserBaseUrl } from '../../../Api';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice/userSlice';
import { updateCartCount } from '../../../features/userSlice/cartSlice';
import PayButton from '../PayButton/PayButton';
import { RingLoader } from 'react-spinners';
import { Course } from '../../../features/tutorSlice/courseSlice';
import DeleteIcon from '@mui/icons-material/Delete';
interface CartItem {
  _id: string;
  quantity: number;
  course: Course; // Make sure Course is imported and properly defined
}

const ShoppingCart = () => {
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
    <div className="bg-gray-200 dark:text-black min-h-screen overflow-x-hidden">
      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row shadow-md my-10">
          <div className="md:w-3/4 bg-gray-200 px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            </div>
            {cartItems.length === 0 ? (
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center m-14">No courses Added in the cart</h1>
              
            ) : (
              cartItems.map((item, index) => (
            <>
            <div  key={index} className="flex mt-10 mb-5">
                      <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                          Product Details
                      </h3>
                      <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                          Quantity
                      </h3>
                      <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5 text-center">
                          Price
                      </h3>
                     
                  </div><div className="flex items-center hover:bg-gray-100 bg-gray-100 md:-mx-8 px-6 py-5">
                          <div className="flex w-2/5">
                              <div className="w-20">
                                  <img
                                      className="h-24"
                                      src={item?.course?.photo}
                                      alt="Image" />
                              </div>
                              <div className="flex flex-col justify-between ml-4 flex-grow">
                                  <span className="font-semibold text-sm">{item?.course?.courseName}</span>
                                  <span className="text-black font-bold text-xs">{item?.course?.coursedescription}</span>
                                  <a
                                      className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                                      onClick={() => handleDelete(item?._id)}
                                  >
                                      Remove
                                  </a>
                              </div>
                          </div>
                          <div className="flex justify-center w-1/5">
                              <svg
                                  className="fill-current text-gray-600 w-3"
                                  viewBox="0 0 448 512"
                              >
                                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                              </svg>
                              <input
                                  className="mx-2 border text-center w-8"
                                  type="text"
                                  value={item?.quantity} />
                              <svg
                                  className="fill-current text-gray-600 w-3"
                                  viewBox="0 0 448 512"
                              >
                                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                              </svg>
                          </div>
                          <span className="text-center w-2/5 font-semibold text-sm">
                          {item?.course?.courseFee}
                          </span>

                          <span
                                      className="font-semibold text-red-500 cursor-pointer text-xs"
                                      onClick={() => handleDelete(item?._id)}
                                  >
                                      <DeleteIcon/>
                                  </span>
                          
                      </div>
                      </>
              ))
              )}

          </div>
          {cartItems.length > 0 && (
          <div
            id="summary"
            className="md:w-1/4 px-8 py-10 bg-gray-600 text-white"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>

            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
              <span className="font-semibold text-sm"> $ {cartItems.reduce((total, item) => total + item?.course?.courseFee * item?.quantity, 0).toFixed(2)}</span>
            </div>

           
           
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>$ {cartItems.reduce((total, item) => total + item?.course?.courseFee * item?.quantity, 0).toFixed(2)}</span>
              </div>
              <PayButton cartItems={cartItems}  />
              </div>
          </div>
            )}  
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
