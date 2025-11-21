import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // Thêm các slice khác ở đây nếu cần
    },
});

export default store;
