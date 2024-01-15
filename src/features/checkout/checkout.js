import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteItemFromCartAsyn,
  selectCart,
  updateCartAsyc,
} from "../Cart/cartSlice";
import { useForm } from "react-hook-form";
import { addOrderAsync, selectCurrentOrder,  } from "../order/orderSlice";
import { selectUserInfo, updateUserAsyc } from "../user/userSlice";
import { discountedPrice } from "../../app/const";




function Checkout() {
  const dispatch = useDispatch();
  const [selectAddress, setSelectAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const item = useSelector(selectCart);
  const totalAmount = item.reduce(
    (amount, x) => discountedPrice(x)* x.quantity + amount,
    0
  );
  const currentOrder = useSelector(selectCurrentOrder)
  const totalItem = item.reduce((total, x) => x.quantity + total, 0);
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsyn(id));
  };
  const handleQuantity = (e, product) => {
    dispatch(updateCartAsyc({ ...product, quantity: +e.target.value }));
  };
  const handleAddress = (e) => {
    setSelectAddress(user.addresses[e.target.value]);
    // setSelectAddress(e.target.value)
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOrder = (e) => {
    if (paymentMethod && selectAddress) {
      const order = {
        item,
        totalAmount,
        totalItem,
        user,
        paymentMethod,
        selectAddress,
        status:'pending',
      };
      dispatch(addOrderAsync(order));
    } else {
      alert(" Enter the payment method and Address");
    }
  };
  const user = useSelector(selectUserInfo);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
    {!item.length &&<Navigate to='/' replace={true}></Navigate>}
    {currentOrder && <Navigate to={`/orderSuccessful/${currentOrder.id}`} replace={true}></Navigate>}
    <div className="mt-10 pt-5  pb-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="space-y-12">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  updateUserAsyc({
                    ...user,
                    addresses: [...user.addresses, data],      
                  })
                );
                reset();
              })}
            >
              <div className="border-b border-gray-900/10 pb-12">
                <h1 className="  text-4xl font-semibold leading-7 text-gray-900">
                  CheckOut
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("name", { required: "name is required" })}
                        id="name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "email is required",
                        })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      phone No
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "email is required",
                        })}
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street", {
                          required: "streer address is required",
                        })}
                        id="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city", { required: "city is required" })}
                        id="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state", {
                          required: "state is required",
                        })}
                        id="state"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("pinCode", {
                          required: "pinCode is required",
                        })}
                        id="pinCode"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6"></div>
                </div>
                <div className="flex  justify-end ...">
                  <div className="">
                    <button
                      type="button"
                      className="rounded-md m-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Reset
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="rounded-md m-2  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Chose from existing Address
              </p>
              <ul role="list">
                {user.addresses.map((address, index) => (
                  <li
                    key={index}
                    className="flex  pr-3 pl-3   justify-between gap-x-6 py-5 border-solid border-2 border-gray-400"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <input
                        id={address.id}
                        onChange={(e) => handleAddress(e)}
                        name="addres"
                        type="radio"
                        value={index}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.city}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {address.role}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>

                      <div className="mt-1 flex items-center gap-x-1.5">
                        <p className="text-xs leading-5 text-gray-500">
                          Phone: {address.phone}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment method{" "}
                  </legend>
                  <p className=" -mb-5 flex mt-1 text-1xl leading-6 text-gray-600">
                    Chose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="Payment method"
                        onClick={(e) => handlePayment(e)}
                        type="radio"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        className="h-4 w-4 -mb-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="Payment method"
                        className=" -mb-4 block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash on delivery
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        name="Payment method"
                        onClick={(e) => handlePayment(e)}
                        type="radio"
                        value="card"
                        checked={paymentMethod === "card"}
                        className="h-4 w-4 -mb-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="-mb-4 block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="upi"
                        onClick={(e) => handlePayment(e)}
                        name="Payment method"
                        type="radio"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        UPI
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className=" mt-24 max-h-8xh  body-blue-200">
            <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2 bg-gray-400">
              <div className="  border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <h1 className=" flex mb-6 text-4xl font-bold tracking-tight text-gray-900">
                    Cart
                  </h1>

                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {item.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4"><div className="line-through">${product.price}</div>${discountedPrice(product)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className=" text-gray-500">
                              <div className="inline mr-2">Qty</div>
                              <select
                                onChange={(e) => handleQuantity(e, product)}
                                value={product.quantity}
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleRemove(e, product.id)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                <div className="flex justify-between my-2   text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>
                <div className="flex justify-between my-2   text-base font-medium text-gray-900">
                  <p>Total items in cart</p>
                  <p>{totalItem} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={(e) => handleOrder(e)}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                   Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        // onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;
