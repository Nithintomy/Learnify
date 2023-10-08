import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice/userSlice'
import tutorReducer from '../features/tutorSlice/tutorSlice' 
import courseReducer from '../features/tutorSlice/courseSlice'
import cartReducer from '../features/userSlice/cartSlice'



export default configureStore({
    reducer:{
        user:userReducer,
        tutor:tutorReducer,
        course:courseReducer,
        cart:cartReducer,
    }
})