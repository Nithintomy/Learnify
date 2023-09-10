import jwt from 'jsonwebtoken'
import 'dotenv/config'


const generateToken:any =(user_id:string)=>{
    // const token =jwt.sign({user_id},process.env.JWT_SECRET as string,{
         const token =jwt.sign({user_id},"qwedrftwfdvydt" as string,{
        
        expiresIn: '1d'
    })

    return token

}

export default generateToken