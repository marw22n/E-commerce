import React, { useContext, useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../components/Contexts/AuthContext';


export default function Login() {
  const navigate = useNavigate()  
  const [isloading, setisloading] = useState(false)
  const [errmessage, seterrmessage] = useState("")
  const {setIsLoggedIn} = useContext(authContext)
  const initialValues = {
    email: '',
    password: '',

  }
  const onSubmit = ()=> {
    seterrmessage("")
    setisloading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
    .then((res) => {
      if(res.data.message == "success"){
      localStorage.setItem('token' , res.data.token)
      setIsLoggedIn(true)
      navigate(location.pathname == "/login" ? "/" : location.pathname)
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
    password :Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ,"Minimum eight characters, at least one letter and one number:"),
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
     <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' variant='bordered' className='col-span-2' label="Password" type="password" />
     <Button isLoading={isloading} type='submit'  className='col-span-2' color="primary">
      Login
    </Button>
    { errmessage && <p className='text-red-500'>{errmessage}</p>}
    <Link to={"/forget-password"} className='text-blue-700'>
      Forgot Password?
    </Link>
     </div>
    </form>
    </div> 
     )
}
