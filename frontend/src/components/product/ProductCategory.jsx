import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination';
import { getcategory } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Product from "./Product";
import { useParams } from "react-router-dom";

export default function ProductCategory() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector(state => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    const { category } = useParams();

    useEffect(() => {
        if (error) {
            toast.error(error);
            return;
        }
        dispatch(getcategory(category));
    }, [error, dispatch, category]);

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo);
    }

    // Calculate the start and end index of products to display based on the current page
    const startIndex = (currentPage - 1) * resPerPage;
    const endIndex = Math.min(startIndex + resPerPage, productsCount);
    console.log(products);
    // Get the products to display for the current page
    const productsToShow = products && products.slice(startIndex, endIndex);

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'Buy Best Products'} />
                <h1 id="products_heading">{category}</h1>

                    <section id="products" className="container  mt-5">
                        <div className="row ">
                            <div className="col-6 col-md-9 mx-auto">
                                <div className="row">
                                    {productsToShow.map(product => (
                                        <Product col={3} key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {productsCount > 0 && productsCount > resPerPage &&
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
                        </div>
                    }
                </>
            }
        </>
    )
}
