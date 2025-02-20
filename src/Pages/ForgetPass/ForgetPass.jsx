import React, { useContext, useState } from 'react'
import {Button, Input} from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../components/Contexts/AuthContext';

export default function ForgetPass() {
    
  const navigate = useNavigate()  
  const [isloading, setisloading] = useState(false)
  const [errmessage, seterrmessage] = useState("")
  const {setIsLoggedIn} = useContext(authContext)
    const initialValues = {
        email: '',

      }
      const onSubmit = ()=> {
    seterrmessage("")
    setisloading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
    .then((res) => {
      if(res.data.message == "success"){
      localStorage.setItem('token' , res.data.token)
      setIsLoggedIn(true)
      navigate(location.pathname == "/forget-password" ? "/verify-code" : location.pathname)
      }
    })
    .catch((err) => {
      seterrmessage(err.response.data.message)
    })
    .finally(() => {
      setisloading(false)
    })
  }
  const validationSchema = 
  Yup.object({
    email: Yup.string().email().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format").required("Email is required"),
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
    <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant='bordered' className='col-span-2' label="Email" type="email" />
    <Link to={ "/verify-code"} isloading={isloading} className='bg-primary rounded-lg text-center text-white p-2'>
      Verify
    </Link>
    { errmessage && <p className='text-red-500'>{errmessage}</p>}

     </div>
    </form>
    </div> 
  )
}
