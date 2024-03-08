import { Carousel } from 'react-bootstrap';
import './Home.css'

import Categories from './layouts/cards'


export default function Home(){
  

    let images = [{image:"https://hips.hearstapps.com/hmg-prod/images/plants-index-1558561755.png"},
    {image:"https://as1.ftcdn.net/v2/jpg/03/16/83/44/1000_F_316834496_4xpm6fZ3iHcNT1llAIonh1VCq6iti5Yd.jpg"},
    {image:"    https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2021/09/29195121/cover-copy.jpg"}
  ]
    return(
        <>
       {/* <Carousel pause="hover" 
       className='m-5'       >
                    {images && images.map(image => 
                    <Carousel.Item key= {image.index}>
                      <img
          className="d-block my-3 w-100 cover"
          src={image.image}
          alt={image.index}
          
          
        />


                    </Carousel.Item>)}
                </Carousel> */}


                <Carousel pause="hover" className='m-5' >
                    {images && images.map(image => 
                    <Carousel.Item key= {image.index}>
                      <img
          className="mx-auto w-90 d-block carousel-image"
          src={image.image}
          alt={image.index}
        />


                    </Carousel.Item>)}
                </Carousel>
               <Categories/>
    
      
        </>
    )
}
