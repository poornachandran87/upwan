import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { logout } from '../../actions/userActions';



export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector(state => state.authState)
  const { items: cartItems } = useSelector(state => state.cartState)
  const logoutHandler = () => {
    dispatch(logout)
  }

  return (
    <nav class="navbar row">
      <div class="col-1 col-md-1">
        <div class="navbar-brand">
          <Link to={'/'} className='heading'>
            <h1 className='p-0'>
              Upwan

            </h1>
          </Link>
        </div>
      </div>

      <div class=" text-center">

        <Dropdown className='d-inline'>
          <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
            <h5>Plants</h5>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              navigate('/category/Indoor Plants')
            }} className='text-dark'>
              Indoor Plants
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              navigate('/category/Outdoor Plants')
            }} className='text-dark'>
              Outdoor Plants
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              navigate('/category/Succulents')
            }} className='text-dark'>
              Succulents
            </Dropdown.Item>

          </Dropdown.Menu>


        </Dropdown>




      </div>
      <Dropdown className='d-inline text-white cursor-pointer'>




        <h5> <Link to={'/category/Seeds'} className='text-white text-decoration-none'>Seeds</Link></h5>


      </Dropdown>
      <Search />
      <Dropdown className='d-inline text-white cursor-pointer'>




        <h5> <Link to={'/suggestPlants'} className='text-white text-decoration-none'>Suggest Me A Plant</Link></h5>


      </Dropdown>
      <Dropdown className='d-inline text-white cursor-pointer'>




        <h5> <Link to={'/identify'} className='text-white text-decoration-none'>Identify Plant</Link></h5>


      </Dropdown>




      <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className='d-inline'>
            <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
              <h5>{user.name}</h5>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {user.role == "admin" && <Dropdown.Item onClick={() => {
                navigate('/admin/dashboard')
              }} className='text-dark'>
                Dashboard
              </Dropdown.Item>}
              <Dropdown.Item onClick={() => { navigate('/myprofile') }} className='text-dark'>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                navigate('/orders')
              }} className='text-dark'>
                My Orders
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler} className='text-danger'>
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>
        ) :
          <Link to={'/login'} class="btn" id="login_btn">Login</Link>
        }

        <Link to="/cart"> <span id="cart" class="ml-3">Cart</span> </Link>
        {/* <span class="ml-1" id="cart_count">{cartItems && cartItems.length}</span> */}
      </div>
    </nav>
  )
}