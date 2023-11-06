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
         <button onClick={()=>handleCheckOut()} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
    
    </div>
  )
}

export default PayButton
