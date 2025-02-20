import { createBrowserRouter, createHashRouter, RouterProvider, useParams } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import Layout from "./Layouts/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import Categories from "./Pages/Categories/Categories";
import Notfound from "./Pages/Notfound/Notfound";
import Cart from "./Pages/Cart/Cart";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Brands from "./Pages/Brands/Brands";
import CounterContextProvider from "./components/Contexts/CounterContext";
import AuthContextProvider from "./components/Contexts/AuthContext";
import ProtectedAuthRoute from "./Auth/ProtectedAuthRoute";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { ToastContainer } from 'react-toastify';
import Address from "./Pages/Address/Address";
import Orders from "./Pages/Orders/Orders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Wishlist from "./Pages/Wishlist/Wishlist";
import ForgetPass from "./Pages/ForgetPass/ForgetPass";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

const queryClient = new QueryClient()

const router = createHashRouter([
  {
    path: "",   element: <Layout />,  children: [
     { index: true, element: <ProtectedRoute><Home/></ProtectedRoute> },
     { path: "login", element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute>  },
     { path: "register", element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
     { path: "forget-password", element: <ProtectedAuthRoute><ForgetPass /></ProtectedAuthRoute> },
     { path: "verify-code", element: <ProtectedAuthRoute><VerifyCode /></ProtectedAuthRoute> },
     { path: "reset-password", element: <ResetPassword /> },
     { path: "categories", element: <ProtectedRoute><Categories/></ProtectedRoute> },
     { path: "brands", element: <ProtectedRoute><Brands/></ProtectedRoute> },
     { path: "cart", element:<ProtectedRoute><Cart/></ProtectedRoute>  },
     { path: "wishlist", element:<ProtectedRoute><Wishlist/></ProtectedRoute>  },
     { path: "allorders", element:<ProtectedRoute><Orders/></ProtectedRoute>  },
     { path: "address/:cartId", element:<ProtectedRoute><Address/></ProtectedRoute>  },
     { path: "productDetails/:id", element:<ProtectedRoute><ProductDetails/></ProtectedRoute>  },
     { path: "* ", element: <Notfound /> },
    ]
  } 
]);
function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>

    <AuthContextProvider>
    <CounterContextProvider>
      <HeroUIProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
        <ReactQueryDevtools/>
      </HeroUIProvider>
    </CounterContextProvider>
    </AuthContextProvider>
    
    </QueryClientProvider>
    </>
  );
}

export default App;
