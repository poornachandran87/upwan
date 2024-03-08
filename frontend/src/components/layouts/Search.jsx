import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search(){

    const navigate = useNavigate()
    const location = useLocation()
    const [keyword,setKeyword] = useState("")
    const searchHandler = (e) =>{
        e.preventDefault();
        navigate(`/search/${keyword}`)
    }

    const clearKeyword = () => {
        setKeyword("")
    }

    useEffect(() =>{
        
        if(location.pathname === '/'){
            clearKeyword()
            }
    },[location])
    return (
        <form onSubmit={searchHandler}>

        <div class="col-12 col-md-6 mt-2 mt-md-0">
          <div class="input-group">
            <input
              type="text"
              id="search_field"
              class="form-control"
              placeholder="Enter Product Name ..."
              value={keyword}
              onChange={(e) => {setKeyword(e.target.value)}}
            />
            <div class="input-group-append">
              <button id="search_btn" class="btn">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        </form>
    )
}