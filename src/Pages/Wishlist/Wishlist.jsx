import axios from "axios";
import React, { useEffect, useState } from "react";
import WishlistProduct from './../../components/WishlistProduct/WishlistProduct';

export default function Wishlist() {
  const [wishlistId, setwishlistId] = useState(null);
  const [wishlistData, setwishlistData] = useState(null);
  const [numOfWishlistItems, setnumOfWishlistItems] = useState(null);
  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  async function getLoggedUserWishlist() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setwishlistId(data.wishlistId);
    setwishlistData(data);
    setnumOfWishlistItems(data.numOfWishlistItems);
  }
  async function removeWishlistProduct(productId) {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setwishlistData(data.data);
    setnumOfWishlistItems(data.numOfWishlistItems);
  }

  return (
    <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Wishlist
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                {numOfWishlistItems} Items
              </h2>
            </div>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
              <div className="col-span-12 md:col-span-7">
                <p className="font-normal text-lg leading-8 text-gray-400">
                  Product Details
                </p>
              </div>
            </div>

            {wishlistData?.products.map((product) => {
              return (
                <WishlistProduct
                  product={product}
                  removeWishlistProduct={removeWishlistProduct}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
