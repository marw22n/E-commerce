 import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' 
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import Slider from "react-slick";
import RelatedProducts from './../../components/RelatedProducts/RelatedProducts';
import { addProductsToCart } from '../../components/ServicesCart/ServicesCart';

 export default function ProductDetails() {
    let  {id}  = useParams()
    const [ProductDet, setProductDet] = useState(null)
    const [isloading, setisloading] = useState(true)
    const [relatedProducts, setrelatedProducts] = useState([])
    useEffect(() => {
      getProductDetails()
    }, [])
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

     function getProductDetails(){
        setisloading(true)
       axios.get("https://ecommerce.routemisr.com/api/v1/products/" +id).then(({data}) => {
         setProductDet(data.data);
         getRelatedProducts(data.data.category._id)
         setisloading(false)
       })
    }
    async function getRelatedProducts(categoryId){
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
      setrelatedProducts(data.data)
    }


    if(isloading){
        return <LoadingScreen/>
    }
   return (
    // <!-- component -->
    <div className="mx-auto">
      <div className="flex flex-col items-center md:flex-row">
        {/* <!-- Product Image --> */}
        <div className="md:w-1/3 p-4 relative">
          <div className=" ">

          <Slider {...settings}>
            {ProductDet?.images.map((img)=>{
              return <img src={img} alt={ProductDet?.title} className="w-full h-auto object-cover rounded-lg"/>
            })
            }
    </Slider>
            <button className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none">
              <svg className="w-6 h-6 absolute top-0 right-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* <!-- Product Details --> */}
        <div className="md:w-2/3 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{ProductDet?.title}</h1>
          <p className="text-sm text-gray-600 mb-4">{ProductDet?.discription}</p>
          
          <div className="flex items-center mb-4">
            <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{ProductDet?.ratingsAverage} ★</span>
            <span className="text-sm text-gray-500 ml-2">{ProductDet?.ratingsQuantity} reviews</span>
          </div>
          
         
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-3xl font-bold text-gray-900">{ProductDet?.price}</span>
              <span className="ml-2 text-sm font-medium text-gray-500 line-through">{ProductDet?.price + 40 }</span>
            </div>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 10%</span>
          </div>
          
          <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>
          
          <div className="flex space-x-4">
            <button  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
              Buy Now
            </button>
            <button onClick={()=> addProductsToCart(ProductDet._id)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
     <RelatedProducts RelatedProducts={relatedProducts}/>
    </div>   )
 }
 