import { Button, Input } from '@heroui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import * as Yup from "yup"

export default function Address() {
    const [isloading, setisloading] = useState(false)
    const{cartId} = useParams()
    function onSubmit() {
        setisloading(true)
        axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
            "shippingAddress": values
          },{
            headers: {
              token: localStorage.getItem("token")
            },
            params: {
              url: "http://localhost:5173/",
            }
          }).then(({data} ) => {
            location.href=data.session.url;
          }).finally(()=> {
            setisloading(false)
          })
      }
      const initialValues = {
        details: '',
        phone: '',
        city: '',
      }
    
      const validationSchema = Yup.object({
        details :Yup.string().required("details is required"),
        city :Yup.string().required("city is required"),
        Phone: Yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone number format").required("Phone is required"),
      })
      const {handleSubmit , values , handleChange , handleBlur , touched , errors} = useFormik({
        initialValues,
        onSubmit,
        validationSchema
      });
  return (
    <div className="my-10">
    <form onSubmit ={handleSubmit} >
    <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
     <Input isInvalid={touched.details && errors.details} errorMessage={errors.details} onBlur={handleBlur} onChange={handleChange} value={values.details} name='details' variant='bordered' className='col-span-2' label="details" type="text" />
     <Input isInvalid={touched.city && errors.city} errorMessage={errors.city} onBlur={handleBlur} onChange={handleChange} value={values.city} name='city' variant='bordered' className='col-span-2' label="city" type="text" />
     <Input isInvalid={touched.Phone && errors.Phone} errorMessage={errors.Phone} onBlur={handleBlur} onChange={handleChange} value={values.Phone} name='Phone' variant='bordered' className='col-span-2' label="Phone" type="tel" />
     <Button isLoading={isloading} type='submit'  className='col-span-2' color="success">
      PLace Order
    </Button>
     </div>
    </form>
    </div>
  )
}
