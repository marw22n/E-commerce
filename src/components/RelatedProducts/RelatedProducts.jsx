import React from 'react'
import Product from '../Product/Product'
import Slider from "react-slick";

export default function RelatedProducts({RelatedProducts}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
      };
  
    return (
    
       <Slider {...settings}>

      {
          
          RelatedProducts.map((products , index) =>
            {
                return <div className='py-9 px-3' ><Product key={index} products={products}/></div>        
            })
        }
        </Slider>
  )
}
