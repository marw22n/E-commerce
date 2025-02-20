import { Button } from "@heroui/react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';
import { addProductsToCart } from "../ServicesCart/ServicesCart";
import { addProductsToWishlist } from "../ServiceWishlist/ServiceWishlist";


export default function Product({ products }) {

  return (
    <div className=" group mx-auto cursor-pointer transform hover:scale-105 duration-300 overflow-hidden border  border-gray-100 bg-white shadow-lg">
      <div className="relative flex h-44 overflow-hidden">
        <Link to={`productDetails/${products._id}`}>
          <img
            className="absolute  h-full w-full object-contain"
            src={products.imageCover}
            alt="product image"
          />
        </Link>
        <div className="absolute bottom-0 mb-4 flex  justify-center items-center space-x-6 "></div>
        <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
          <button onClick={()=> addProductsToWishlist(products._id)} className="">
          <i class="fa-solid fa-heart text-3xl text-black duration-250 hover:text-red-600"></i>
          </button>
        </div>
      </div>
      <div className="mt-4 px-5 bg-zinc-200 h-40 pb-5">
        <Link to={`productDetails/${products._id}`}>
          <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">
            {products.title}
          </h5>
        </Link>
        <Link to={`productDetails/${products._id}`}>
          <p className="text-medium tracking-tight text-gray-700 line-clamp-1">
            {products.description}
          </p>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {products.price}
            </span>
            <span className="text-sm text-slate-900 line-through">
              {products.price + 30}
            </span>
          </p>
        </div>
        <Button onPress={()=> addProductsToCart(products._id)} className="flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
