import React, { useContext, useEffect } from 'react'
import { authContext } from '../../components/Contexts/AuthContext'
import axios from 'axios'

export default function Orders() {
    const {userId} = useContext(authContext)
    useEffect(() => {
        getUserOrders()
    }, [])
    

    function getUserOrders(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`).then(({data}) =>{
            console.log(data)
        })
    }
  return (
    <div>Orders</div>
  )
}
