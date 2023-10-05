import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../features/userSlice/userSlice'
import tutorSlice from '../features/tutorSlice/tutorSlice' 
import courseSlice from '../features/tutorSlice/courseSlice'



export default configureStore({
    reducer:{
        user:userSlice,
        tutor:tutorSlice,
        course:courseSlice
    }
})