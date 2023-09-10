import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../features/userSlice/userSlice'
import tutorSlice from '../features/tutorSlice/tutorSlice' 


export default configureStore({
    reducer:{
        user:userSlice,
        tutor:tutorSlice
    }
})