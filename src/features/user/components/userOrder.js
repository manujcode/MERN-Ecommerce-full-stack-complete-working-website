import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrderAsyc, selectUserInfo, selectUserOrder } from "../userSlice";
import { discountedPrice } from "../../../app/const";

//
export function Orders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsyc(user.id));
  }, []);
  const orders = useSelector(selectUserOrder);

  return (
    <div>

      {orders.map((order, index) => {
        return (
          <div className=" mt-24 max-h-8xh  body-blue-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-blue-300">
              <div className="  border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <h1 className=" flex mb-6 text-4xl font-bold tracking-tight text-gray-900">
                    Order # {order.id}
                  </h1>
                  <h1 className=" flex mb-6 text-4xl font-bold tracking-tight text-gray-900">
                    Order Status : {order.status}
                  </h1>

                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.item.map((product) => (
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
                              <p className="ml-4"><div className="line-through">${discountedPrice(product)}</div>${product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className=" text-gray-500">
                              <div className="inline mr-2">
                                Qty:{product.quantity}
                              </div>
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
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total items in cart</p>
                  <p>{order.totalItem} items</p>
                </div>
                <div className="flex font-semibold		">
                    Shipping Address
                </div>
                <li
                  key={index}
                  className="flex  pr-3 pl-3   bg-slate-300 justify-between gap-x-6 py-5 border-solid border-2 border-black"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectAddress.city}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectAddress.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectAddress.role}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {order.selectAddress.street}
                    </p>

                    <div className="mt-1 flex items-center gap-x-1.5">
                      <p className="text-xs leading-5 text-gray-500">
                        Phone: {order.selectAddress.phone}
                      </p>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
