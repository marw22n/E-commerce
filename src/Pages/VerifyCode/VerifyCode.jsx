import React, { useContext, useState } from 'react'
import {Button, Input} from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../components/Contexts/AuthContext';
export default function VerifyCode() {
    const navigate = useNavigate()  
    const [isloading, setisloading] = useState(false)
    const [errmessage, seterrmessage] = useState("")
    const {setIsLoggedIn} = useContext(authContext)
      const initialValues = {
        resetCode: '',
  
        }
        const onSubmit = ()=> {
      seterrmessage("")
      setisloading(true)
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      .then((res) => {
        if(res.data.message == "success"){
        localStorage.setItem('token' , res.data.token)
        setIsLoggedIn(true)
        navigate(location.pathname == "/verify-code" ? "/" : location.pathname)
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
      resetCode: Yup.string().required("resetcode is required").matches(/^[0-9]/, "Invalid resetCode format"),
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
    <Input isInvalid={touched.resetCode && errors.resetCode} errorMessage={errors.resetCode} onBlur={handleBlur} onChange={handleChange} value={values.resetCode} name='resetCode' variant='bordered' className='col-span-2' label="Code" type="resetCode" />
    <Button onPress={"/reset-password"} className='bg-primary rounded-lg text-center text-white p-2'>
      Verify
    </Button>
    { errmessage && <p className='text-red-500'>{errmessage}</p>}

     </div>
    </form>
    </div> 
  )
}
