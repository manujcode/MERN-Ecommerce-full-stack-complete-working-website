import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsyn,
  selectCart,
  selectCartStatus,
  updateCartAsyc,
} from "./cartSlice";
import { discountedPrice } from "../../app/const";
import { selectedProductListStatus } from "../product-list/ProductSlice";
import { Grid } from "react-loader-spinner";
import Modal from "../comman/modal";
// import { handler } from "@tailwindcss/aspect-ratio";

//
//
export function Cart() {
  // const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  // const incrementValue = Number(incrementAmount) || 0;
  const item = useSelector(selectCart);
  const [openModal, setOpenModal] = useState(null);

  const totalAmount = item.reduce(
    (amount, x) => discountedPrice(x) * x.quantity + amount,
    0
  );
  const totalItem = item.reduce((total, x) => x.quantity + total, 0);
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsyn(id));
  };
  const handleQuantity = (e, product) => {
    dispatch(updateCartAsyc({ ...product, quantity: +e.target.value }));
  };
  const Status = useSelector(selectCartStatus);

  return (
    <>
      {totalItem <= 0 && <Navigate to="/" replace={true}></Navigate>}

      {Status === "loading" ? (
        <Grid
          visible={true}
          height="80"
          width="80"
          color="rgb(79 70 229)"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      ) : null}
      <div className=" mt-24 max-h-8xh  body-blue-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-blue-300">
          <div className="  border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <h1 className=" flex mb-6 text-4xl font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div></div>
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
                          <p className="ml-4">
                            <div className="line-through">${product.price}</div>{" "}
                            ${discountedPrice(product)}
                          </p>
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
                          <Modal
                            title={`Delete ${product.title}`}
                            message="Are You sure want to delete this Cart Item ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            showModal={openModal === product.id}
                            cancelAction={(e)=>setOpenModal(-1)}
                            dangerAction={(e) => handleRemove(e, product.id)}
                          ></Modal>
                          <button
                            onClick={() => setOpenModal(product.id)}

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

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total items in cart</p>
              <p>{totalItem} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
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
    </>
  );
}
export default Cart;
