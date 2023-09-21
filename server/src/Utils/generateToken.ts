import 'dotenv/config'
import jwt from 'jsonwebtoken'


console.log(process.env.JWT_SECRET,"env")
const generateToken:any =(user_id:string)=>{
         const token =jwt.sign({user_id},process.env.JWT_SECRET as string,{     
        expiresIn: '1d'
    })

    return token

}

export default generateToken