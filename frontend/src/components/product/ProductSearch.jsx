import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination'
import { getproducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Product from "./Product";
import { useParams } from "react-router-dom";




export  default function ProductSearch(){
    
    const dispatch = useDispatch()

    const { products,loading,error,productsCount,resPerPage } = useSelector(state => state.productsState)
    const [currentPage,setCurrentPage] = useState(1)
    // const [category,setCatageory] = useState("")
    // const [ratings,setRatings] = useState(0)
    const { keyword } = useParams()
    // const catageories = [
    //             'Indoor Plants',
    //             'Outdoor Plants',
    //             'Succulents',
    //             'Flowering Plants',
    //             'Seeds'
    // ]

    const setCurrentPageNo =(pageNo) => {
  setCurrentPage(pageNo)
}
    useEffect(() => {
      if(error) {
           toast.error(error)
           return
    }
    dispatch(getproducts(keyword,null,null,currentPage))
},[error,dispatch,keyword,currentPage])



// useEffect(() => {
//     if(error) {
//          toast.error(error)
//          return
//   }
    // if(category){
    //     dispatch(getproducts(null,category,null,null))
    //     return
    // }
    //   dispatch(getproducts(keyword,category,ratings,currentPage))
    // },[error,dispatch,keyword,category,currentPage,ratings])

    return (<>
       {loading? <Loader/>: 
       
       <>
       <MetaData title={'Buy Best Products'} />
       <h1 id="products_heading">Search Products</h1>

<section id="products" className="container mt-5">
  <div className="row">
 
    <div className="col-6 col-md-9 mx-auto">
        <div className="row">
    {products && products.map(product => (
      <Product col={4} key={product._id} product={product}/>
    ))}
          
        </div>
    </div>
    

    
  </div>
</section>
{productsCount > 0 && productsCount > resPerPage ?
<div className="d-flex justify-content-center mt-5">
  <Pagination
  activePage={currentPage}
  onChange={setCurrentPageNo}
  totalItemsCount={productsCount}
  itemsCountPerPage={resPerPage}
  nextPageText={'Next'}
  firstPageText={'First'}
  lastPageText={'Last'}
  itemClass={"page-item"}
  linkClass={"page-link"}
  />
</div>:null}

       </>
       }
       </>
    )
}


{/* <div className="col-6 col-md-3">
<div className="px-0 ">
    <h3 className="mb-3">Catageories</h3>
    <ul className="pl-0">
    {catageories.map(category =>
        <li
        key={category}
        onClick={()=>{
            setCatageory(category)
        }}
        style={{
            cursor:"pointer",
            listStyleType:"none"
        }}>
            {category}
        </li>
        )}
    </ul>
  
</div>
<div className="mt-5">
    <h4 className="mb-3"> Ratings</h4> 
    <ul className="pl-0">
    {[5,4,3,2,1].map(star =>
        <li
        key={star}
        onClick={()=>{
            setRatings(star)
        }}
        style={{
            cursor:"pointer",
            listStyleType:"none"
        }}>
            <div className="rating-outer">
                <div className="rating-inner"
                style={{
                    width:`${star * 20}%`
                }}
                ></div>
            </div>
        </li>
        )}
    </ul>
</div>
</div> */}






