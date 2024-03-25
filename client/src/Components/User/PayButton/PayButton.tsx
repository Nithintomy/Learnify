import axios from 'axios'
import React from 'react'
import { PaymentBaseUrl } from '../../../Api'


function PayButton({cartItems}:any) {

    const handleCheckOut=()=>{

        axios.post(`${PaymentBaseUrl}/stripePayment`,{
          cartItems
        }).then((response)=>{
          if(response.data.url){
            window.location.href = response.data.url;
          }
        }).catch((err)=>{
          console.log(err.message)
        })

    }

  return (
    <div>
         <button onClick={()=>handleCheckOut()} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
    
    </div>
  )
}

export default PayButton
