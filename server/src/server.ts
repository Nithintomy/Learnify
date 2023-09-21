import express from 'express';
import './connection/connection'; // Importing the database connection setup
import studentRouter from './Routes/StudentRouter/studentRouter';
import tutorRouter from './Routes/TutorRouter/tutorRouter';
import adminRouter from './Routes/AdminRouter/adminRouter';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config(); // Load environment variables from .env file


const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/student',studentRouter)
app.use('/tutor',tutorRouter)
app.use('/admin',adminRouter)

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
