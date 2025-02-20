import React from "react";

export default function WishlistProduct({product,
    removeWishlistProduct,
     }) {
  return (
    <div className="flex relative flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
      <div className="w-full md:max-w-[126px]">
        <img
          src={product.product.imageCover}
          alt="perfume bottle image"
          className="mx-auto rounded-xl object-cover"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="md:col-span-2">
          <div className="flex flex-col max-[500px]:items-center gap-3">
            <h6 className="font-semibold text-base leading-7 text-black">
              {product.product.title}
            </h6>
            <h6 className="font-normal text-base leading-7 text-gray-500">
              {product.product.category.name}
            </h6>
            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
              ${product.price}
            </h6>
          </div>
        </div>
      </div>
      <div className="group">
        <i
          onClick={() => removeWishlistProduct(product.product._id)}
          className="fa-solid fa-trash absolute top-10 end-2 cursor-pointer hover:text-red-500 duration-400"
        ></i>
      </div>
    </div>
  );
}
