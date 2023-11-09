import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice/userSlice'
import tutorReducer from '../features/tutorSlice/tutorSlice' 
import adminReducer from '../features/adminSlice/adminSlice'
import courseReducer from '../features/tutorSlice/courseSlice'
import cartReducer from '../features/userSlice/cartSlice'
import themeReducer from '../features/userSlice/themeSlice'



export default configureStore({
    reducer:{
        user:userReducer,
        tutor:tutorReducer,
        admin:adminReducer,
        course:courseReducer,
        cart:cartReducer,
        theme: themeReducer,
       
       
    }
})