import axios from "axios";
import { map } from "framer-motion/client";
import React, { useContext, useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Home() {
  const [products, setproducts] = useState([]);
  const [IsLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    setIsLoading(true)
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setproducts(data.data);
    setIsLoading(false)
  }
  if(IsLoading){
    return <LoadingScreen/>
  }
  return (
    <div className=" grid md:grid-cols-3 xl:grid-cols-5 gap-5">
      {
        products.map((products , index) =>
        {
          return <Product key={index} products={products}/>        
        })
      }
    </div>
  );
}
