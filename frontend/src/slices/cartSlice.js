import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items:[],
        loading: false,
        shippingInfo:localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')):{}
       
    },
    reducers: {
        addCartItemRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        addCartItemSuccess(state, action){
            return {
                ...state,
                loading: false,
                items : action.payload.item
            }
            
           
        },

        getCartItemRequest(state, action){
            return {
                loading: true
            }
        },
        getCartItemSuccess(state, action){
            return {
                loading: false,
                items: action.payload.item
            }
        },
        increaseCartItemQty(state,action){
            state.items = state.items.map(item => {
                if(item.product === action.payload){
                    item.quantity = item.quantity + 1
                }
                return item;
            })
            localStorage.setItem('cartItems',JSON.stringify(state.items))
        },
        decreaseCartItemQty(state,action){
            state.items = state.items.map(item => {
                if(item.product === action.payload){
                    item.quantity = item.quantity - 1
                }
                return item;
            })
            localStorage.setItem('cartItems',JSON.stringify(state.items))
        },
        removeItemFromCart(state,action){
            const filteredItems = state.items.filter(item => {
                return item.product !== action.payload ;
            })
            localStorage.setItem('cartItems',JSON.stringify(filteredItems))
            return {
                ...state,
                items: filteredItems
            }
        },
        saveShippingInfo(state,action){
            localStorage.setItem('shippingInfo',JSON.stringify(action.payload))
            return {
                ...state,
                shippingInfo:action.payload
            }
        },
        orderCompleted(state, action) {
           // localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            return {
                items: [],
                loading: false,
                shippingInfo: {}
            }
        }

    
    }
});

const { actions, reducer } = cartSlice;

export const { 
    addCartItemRequest,
    addCartItemSuccess,
    increaseCartItemQty,
    decreaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted,
    getCartItemRequest,
    getCartItemSuccess

} = actions;

export default reducer;