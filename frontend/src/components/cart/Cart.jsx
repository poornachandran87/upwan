
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from "../../slices/cartSlice";
import { decreaseCart, deleteCart, getCart, increaseCart } from "../../actions/cartActions";
import { useEffect } from "react";
import Loader from "../layouts/Loader";

export default function Cart(){
    const {items,loading} = useSelector(state => state.cartState)
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() =>{
        dispatch(getCart)
    },[dispatch])

    const  checkoutHandler = () =>{
        navigate('/login?redirect=shipping')
    }
  
    const increaseQty = (item) =>{
        const count = item.quantity;
        if(item.stock === 0 || count >= item.stock) return;
        dispatch(increaseCart(item.product,user))
    }

    const decreaseQty = (item) =>{
        const count = item.quantity;
        if( count === 1) return;
        dispatch(decreaseCart(item.product,user))
    }
    return (
        <>
        {loading? <Loader/>:
        <>{items && items.length === 0 ? 
            <h2 className="mt-5">Your Cart is Empty!</h2>:
        
        <>
        
         <h2 className="mt-5">Your Cart: <b>{items && items.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">

                
                {items && items.map(item => (

                <>
                <hr />
                <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt={item.name} height="90" width="115" />
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">₹{item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=> dispatch(deleteCart(item.product,user))}></i>
                        </div>

                    </div>
                </div>

                <hr /> </>
                ))}
               
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{items && items.reduce((acc,item) => (acc + item.quantity),0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">₹{items && items.reduce((acc,item) => (acc + item.quantity * item.price),0)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
                </div>
            </div>
        </div>
        
        </> }
        </>
        }
        </>
    )
}