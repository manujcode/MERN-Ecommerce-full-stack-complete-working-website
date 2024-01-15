import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEM_PER_PAGE, discountedPrice } from "../../../app/const";
import {
  fetchAllOrdersAsyc,
  fetchOrdersByFilterAsyc,
  selectOrders,
  selecttotalOrders,
  updateOrderAsyc,
} from "../../order/orderSlice";
import { ArrowUpIcon, EyeIcon, PencilIcon ,ArrowDownIcon} from "@heroicons/react/24/outline";
import Paging from "../../comman/paging";
// import { ArrowDownIcon } from "@heroicons/react/24/outline";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selecttotalOrders);
  const dispatch = useDispatch();
  const [sort, setSort] = useState({ _sort: null, _order: null });
  const handlePage = (page) => {
    setPage(page);
    const paging = { ...sort, _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsyc(paging));
  };
  useEffect(() => {
    const paging = { ...sort, _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsyc(paging));
  }, [dispatch, page]);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const choseColor = (order) => {
    switch (order.status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return " bg-yellow-200 text-yellow-600";
      case "delivered":
        return " bg-green-200 text-green-600";
      case "cancelled":
        return " bg-red-200 text-red-600";
      default:
        return " bg-purple-200 text-purple-600";
    }
  };
  const handleShow = () => {};
  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsyc(updateOrder));
    setEditableOrderId(-1);
    console.log("xxx");
  };

  const handleEdit = (item) => {
    setEditableOrderId(item.id);
    //  console.log(editableOrderId)
  };

  const handleSort = (sort) => {
    const newSort = { ...sort, _page: page, _limit: ITEM_PER_PAGE };
    console.log(sort);
    setSort(sort);
    dispatch(fetchOrdersByFilterAsyc(newSort));
  };
  return (
    <div className="overflow-x-auto">
      <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        _sort: "id",
                        _order: sort._order == "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order#{sort._order==="asc"&&sort._sort=="id"?<ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>:null}{sort._order==="desc"&&sort._sort=="id"?<ArrowDownIcon className="w-4 h-4 inline "></ArrowDownIcon>:null}
                  </th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-centercursor-pointer"
                    onClick={(e) =>
                      handleSort( {
                        _sort: "totalAmount",
                        _order: sort._order == "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{sort._order==="asc"&&sort._sort=="totalAmount"?<ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>:null}{sort._order==="desc"&&sort._sort=="totalAmount"?<ArrowDownIcon className="w-4 h-4 inline "></ArrowDownIcon>:null}</th>
                  <th className="py-3 px-6 text-center">Shiping Address</th>

                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.item.map((item) => (
                        <div className="flex items-center">
                          <div>
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.thumbnail}
                            />
                          </div>
                          <span>
                            {item.title} - #{item.quantity} - $
                            {discountedPrice(item)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        $ {order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className=" ">
                        <div>
                          <strong>{order.selectAddress.name}</strong>,
                        </div>
                        <div>{order.selectAddress.city},</div>
                        <div>{order.selectAddress.street},</div>
                        <div>{order.selectAddress.state},</div>
                        <div>{order.selectAddress.pinCode},</div>
                        <div>{order.selectAddress.phone},</div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id != editableOrderId ? (
                        <span
                          className={` ${choseColor(
                            order
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      ) : (
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdate(e, order)}
                        >
                          {/* <option value="Chose"> --Choose-- </option> */}
                          <option value="pending">pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon
                            className="w-6 h-6 "
                            onClick={handleShow}
                          ></EyeIcon>
                        </div>
                        <div className="w-4 ml-4 transform hover:text-purple-500 hover:scale-110">
                          <PencilIcon
                            className="w-6 h-6 "
                            onClick={() => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paging
              page={page}
              setPage={setPage}
              handlePage={handlePage}
              totalItem={totalOrders}
            ></Paging>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
