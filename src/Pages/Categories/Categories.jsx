import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'

export default function Categories() {


  function getAllCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  const {data ,isLoading,isfetching} =  useQuery(
    {
      queryKey:["categories"] ,
      queryFn:getAllCategories, 
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
    <div className='grid xl:grid-cols-3  gap-4'>
      {
        data?.map((category , index) => {
          return<div key={index} className=" group flex justify-center items-center cursor-pointer min-h-screen">
              <div className="max-w-[720px] group-hover:scale-105 overflow-hidden mx-auto ">      
                  <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
                          <img
                              src={category.image}
                              alt="card-image" className="object-cover w-full h-full" />
                      </div>
                      <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                              <p className="block font-sans text-center antialiased font-medium leading-relaxed text-blue-gray-900">
                                 {category.name}
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
