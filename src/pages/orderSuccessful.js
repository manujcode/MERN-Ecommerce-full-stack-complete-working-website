
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useParams } from "react-router-dom"
// import { resetCart } from "../features/Cart/cartAPI"
import { resetCartAsyc } from "../features/Cart/cartSlice"
import { selectLoggedInUser } from "../features/auth/authSlice"
import { resetOrder } from "../features/order/orderSlice"

export default function OrderSuccessful() {
  const order =useParams()
  const dispatch =useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{

   dispatch(resetCartAsyc(user.id))
  dispatch(resetOrder())
  },[dispatch,user])
    return (
      <>
      {!order && <Navigate to="/" replace={true}></Navigate>}
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Order Successfully Placed</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"> Order Number #{order.id}</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
            {" You can check your order in My Account > My Order"}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                 to={"/"}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }