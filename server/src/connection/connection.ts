import mongoose from 'mongoose'
import * as dotenv from 'dotenv';
mongoose.set('strictQuery',true)

dotenv.config();


async function connectToDb() {
    const URI:string = process.env.MONGO_URL??""
    
   console.log(URI,"ppp");
   
    try {
        await mongoose.connect(URI);
        console.log('====================================');
        console.log("conncted");
        console.log('====================================');
        
    } catch (error) {
        console.error(error)
    }
}


export default connectToDb