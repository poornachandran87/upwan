import axios from 'axios';
import { addCartItemRequest, addCartItemSuccess, getCartItemRequest, getCartItemSuccess } from '../slices/cartSlice';

export const addCartItems = (id,quantity,user) => async (dispatch) => {
    try{

        dispatch(addCartItemRequest());
        const { data } = await axios.get(`/api/v1/product/${id}`)
        console.log(data);
        const cart = {
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].image,
            stock:data.product.stock,
            quantity}
        await axios.put('/api/v1/cart/add',{user,cart})
        //dispatch(addCartItemSuccess());
        
        

        



    }catch(error){
       
    }
}
export const increaseCart = (id,user) => async (dispatch) => {
    try{

        dispatch(addCartItemRequest());
        
        await axios.put('/api/v1/cart/plus',{user,id})
        console.log(user);
        dispatch(getCartItemRequest());
        
        const { data } = await axios.get('/api/v1/cartitems')
        dispatch(getCartItemSuccess(data));



    }catch(error){
       
    }
}

export const decreaseCart = (id,user) => async (dispatch) => {
    try{

        dispatch(addCartItemRequest());
        
        await axios.put('/api/v1/cart/minus',{user,id})
        console.log(user);
        dispatch(getCartItemRequest());
        
        const { data } = await axios.get('/api/v1/cartitems')
        dispatch(getCartItemSuccess(data));



    }catch(error){
       
    }
}

export const deleteCart = (id,user) => async (dispatch) => {
    try{

        dispatch(addCartItemRequest());
        
        await axios.put('/api/v1/cart/delete',{user,id})
        console.log(user);

        dispatch(getCartItemRequest());
        
        const { data } = await axios.get('/api/v1/cartitems')
        dispatch(getCartItemSuccess(data));



    }catch(error){
       
    }
}


export const getCart =  async (dispatch) => {
    try{

        dispatch(getCartItemRequest());
        
        const { data } = await axios.get('/api/v1/cartitems')
        dispatch(getCartItemSuccess(data));


    }catch(error){
       
    }
}









// const userId = user._id

//         const { datas } = await axios.get(`/api/v1/cartitems/${userId}`)
      
//         //dispatch(addCartItemSuccess(item));
//         console.log(datas);