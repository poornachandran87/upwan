import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { register,clearAuthError } from "../../actions/userActions"
import MetaData from "../layouts/MetaData";
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [userData,setUserData] = useState({
    name:"",
    email:"",
    password:""
  })
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const {loading,error,isAuthenticated} = useSelector(state => state.authState)
  const onChange = (e) => {
    setUserData({...userData,[e.target.name]:e.target.value} )
  }
  const submitHandler = (e) =>{
    e.preventDefault()
    // const userData = new FormData()
    // userData.append('name',userData.name)
    // userData.append('email',userData.email)
    // userData.append('password',userData.password)
    
    dispatch(register(userData))
  } 
  useEffect(() => {
    if(isAuthenticated){
        navigate('/')
    }
    if(error) {
         toast(error,{
            type:'error',
            onOpen:() =>{
                dispatch(clearAuthError)
            }
         })
         return
  }
  
  },[error,isAuthenticated,dispatch,navigate])

    return (
      <>
      <MetaData title={'Register'} />
        <div class="row wrapper">
		<div class="col-10 col-lg-5">
        <form onSubmit= {submitHandler} class="shadow-lg">
            <h1 class="mb-3">Register</h1>

          <div class="form-group">
            <label for="email_field">Name</label>
            <input type="name"
            name="name"
            onChange={onChange} 
            id="name_field" 
            class="form-control"
              />
          </div>

            <div class="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                name="email"
                onChange={onChange}
                id="email_field"
                class="form-control"
                
                
              />
            </div>
  
            <div class="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                name="password"
                onChange={onChange}
                id="password_field"
                class="form-control"
             
              />
            </div>

           
         
  
            <button
              id="register_button"
              type="submit"
              class="btn btn-block py-3"
              disabled={loading}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
      </>
    )
}