import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null,
        productsCount: 0,
        resPerPage: 3,
        isReviewDeleted: false,
        reviews: []
    },
    reducers: {
        productsRequest(state, action){
            return {
                loading: true
            }
        },
        productsSuccess(state, action){
            return {
                loading: false,
                products: action.payload.products,
                productsCount:action.payload.count,
                resPerPage:action.payload.resPerPage
            }
        },
        productsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        productsCatageoryRequest(state, action){
            return {
                loading: true
            }
        },
        productsCatageorySuccess(state, action){
            return {
                loading: false,
                products: action.payload.products,
                productsCount:action.payload.count,
                resPerPage:action.payload.resPerPage
            }
        },
        productsCatageoryFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        adminProductsRequest(state, action){
            return {
                loading: true
            }
        },
        adminProductsSuccess(state, action){
            return {
                loading: false,
                products: action.payload.products,
            }
        },
        adminProductsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        clearError(state, action){
            return {
                ...state,
                error:  null
            }
        },
        reviewsRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        reviewsSuccess(state, action){
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            }
        },
        reviewsFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        deleteReviewRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            }
        },
        deleteReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        }
    }
});

const { actions, reducer } = productsSlice;

export const { 
    productsRequest, 
    productsSuccess, 
    productsFail,
    productsCatageoryFail,
    productsCatageoryRequest,
    productsCatageorySuccess,
    adminProductsFail,
    adminProductsRequest,
    adminProductsSuccess,
    reviewsRequest,
    reviewsFail,
    reviewsSuccess,
    deleteReviewFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    clearReviewDeleted

} = actions;

export default reducer;