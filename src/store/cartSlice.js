import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyCart, addToCart as addToCartAPI } from '../services/cartService';

// Async thunk: Load cart từ API
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getMyCart();
            return data; // [{addAt, course: {...}}, ...]
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
        }
    }
);

// Async thunk: Add to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (courseName, { rejectWithValue, dispatch }) => {
        try {
            await addToCartAPI(courseName);
            // Sau khi add thành công → refetch cart
            dispatch(fetchCart());
            return courseName;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],           // Mảng cart items từ API
        count: 0,            // Số lượng items
        loading: false,      // Đang load API
        error: null,         // Error message
        addingCourse: null,  // Course đang add (để disable button)
    },
    reducers: {
        // Action đồng bộ (nếu cần)
        clearCart: (state) => {
            state.items = [];
            state.count = 0;
        },
    },
    extraReducers: (builder) => {
        // fetchCart
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
            state.count = action.payload.length;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // addToCart
        builder.addCase(addToCart.pending, (state, action) => {
            state.addingCourse = action.meta.arg; // Lưu courseName đang add
        });
        builder.addCase(addToCart.fulfilled, (state) => {
            state.addingCourse = null;
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            state.addingCourse = null;
            state.error = action.payload;
        });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
