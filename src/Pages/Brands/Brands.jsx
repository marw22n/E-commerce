import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'

export default function Brands() {
  function getAllBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  const {data ,isLoading,isfetching} =  useQuery(
    {
      queryKey:["brands"] ,
      queryFn:getAllBrands, 
      select: (data) => data.data.data,
      staleTime:3000,
      refetchOnMount:true,
      refetchOnWindowFocus: true,
      refetchOnReconnect:false
    }
  )
  if(isLoading){
    return <LoadingScreen/>
  }
  return (
    <div className='grid xl:grid-cols-4 md:grid-cols-2 gap-2 '>
      {
        data?.map((brands , index) => {
          return <div key={index} class="  flex justify-center items-center cursor-pointer min-h-screen">
          <div className="max-w-[720px]  mx-auto shadow-xl rounded-lg">      
              <div className="relative group flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                  <div className="relative mx-4 mt-4 group-hover:scale-105 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl w-full">
                      <img
                          src={brands.image}
                          alt="card-image" className="object-cover w-full h-full" />
                  </div>
                  <div className="p-6">
                      <div className=" mb-2">
                          <p className="block font-sans text-center antialiased font-medium leading-relaxed">
                             {brands.name}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    })
      }
    </div>
  )
}
