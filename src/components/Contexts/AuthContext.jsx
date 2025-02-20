import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext()
export default function AuthContextProvider({children}){
const [IsLoggedIn, setIsLoggedIn] = useState(false)
const [IsLoading, setIsLoading] = useState(true)
const [userId, setuserId] = useState("")

    useEffect(() => {
        if (localStorage.getItem("token")){
            verifyUserToken()
        }
    }, [])

    function verifyUserToken(){
        setIsLoading(true)
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken" ,{
            headers: {
                token: localStorage.getItem("token")
            }
    })
    .then((res) => {
        setuserId(res.data.decoded.id)
      setIsLoggedIn(true)
      }
    )
    .catch((err) => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    })
    .finally(() =>{
        setIsLoading(false)

    }
    )
   
  }
    

    return <authContext.Provider value={{IsLoggedIn , setIsLoggedIn, IsLoading ,userId}}>
        {children}
    </authContext.Provider>
}