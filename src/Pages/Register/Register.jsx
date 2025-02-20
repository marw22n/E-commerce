import React, { useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './../Login/Login';

export default function Register() {
  const navigate = useNavigate()  
  const [isloading, setisloading] = useState(false)
  const [errmessage, seterrmessage] = useState("")
  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    Phone: '',
  }
  const onSubmit = ()=> {
    seterrmessage("")
    setisloading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then((res) => {
      console.log(res)
      navigate("/Login")
    })
    .catch((err) => {
      console.log(err.response.data.message)
      seterrmessage(err.response.data.message)
    })
    .finally(() => {
      setisloading(false)
    })
  }
  const validationSchema = Yup.object({
    name :Yup.string().required("Name is required").min(3 , "Name must be more than 2 characters").max(20 , "Name must be less than 21 characters"),
    email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format").required("Email is required"),
    password :Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ,"Minimum eight characters, at least one letter and one number:"),
    rePassword :Yup.string().required().oneOf([Yup.ref("password")], "Not Matches with password"),
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
     <Input isInvalid={touched.name && errors.name} errorMessage={errors.name} onBlur={handleBlur} onChange={handleChange} value={values.name} name='name' variant='bordered' className='col-span-2' label="Name" type="name" />
     <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant='bordered' className='col-span-2' label="Email" type="email" />
     <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' variant='bordered' className='col-span-1' label="Password" type="password" />
     <Input isInvalid={touched.rePassword && errors.rePassword} errorMessage={errors.rePassword} onBlur={handleBlur} onChange={handleChange} value={values.rePassword} name='rePassword' variant='bordered' className='col-span-1' label="rePassword" type="password" />
     <Input isInvalid={touched.Phone && errors.Phone} errorMessage={errors.Phone} onBlur={handleBlur} onChange={handleChange} value={values.Phone} name='Phone' variant='bordered' className='col-span-2' label="Phone" type="tel" />
     <Button isLoading={isloading} type='submit'  className='col-span-2' color="primary">
      Register
    </Button>
    { errmessage && <p className='text-red-500'>{errmessage}</p>}
     </div>
    </form>
    </div>
  )
}
