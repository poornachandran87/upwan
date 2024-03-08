
import { Link } from 'react-router-dom';
import './cards.css'


import React from 'react';

function Categories() {
  
  return (
    <div className='mb-0'>

    <div className='event-cardsss'>
        <div className="cardss" style={{ width: '18rem' }}>
      <img src="https://nurserylive.com/cdn/shop/products/nurserylive-easy-to-grow-plants-on-metal-stand-for-indirect-light-location.jpg" className="card-img-topss" alt="..." />
      <div className="card-bodyss">
        <Link to={'/category/Indoor Plants'} className="btn btn-primaryss" > Indoor Plants </Link>
        
      </div>
    </div>

    <div className="cardss" style={{ width: '18rem' }}>
       <img src=" https://housing.com/news/wp-content/uploads/2023/03/outdoor-plants-for-home-shutterstock_479603197-1200x700-compressed.jpg " className="card-img-topss" alt="..." /> 
     
      
      <div className="card-bodyss">
         <Link to={'/category/Outdoor Plants'} className="btn btn-primaryss"> Outdoor Plants  </Link>
      </div>
    </div>

    <div className="cardss" style={{ width: '18rem' }}>
      <img src="https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2017/8/23/1/Original_Alison-Gootee_098.jpg.rend.hgtvcom.616.462.suffix/1503535018325.jpeg" className="card-img-topss" alt="..." />
      <div className="card-bodyss">
        <Link to={'/category/Succulents'} className="btn btn-primaryss"> Succulents   </Link>
      </div>
    </div>

    

   
  

    </div>

    </div>

   


    
  );
}

    export default Categories;