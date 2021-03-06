import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { reducer as authReducer } from './auth/authSlice'
import { reducer as userReducer } from './user/userSlice'
import { reducer as friendsReducer } from './friends/friendsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    friends: friendsReducer
  },
  middleware: getDefaultMiddleware({ serializableCheck: false })
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
