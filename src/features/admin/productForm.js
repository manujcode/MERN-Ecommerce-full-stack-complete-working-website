// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectedProduct,
  updateProductAsync,
} from "../product-list/ProductSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../comman/modal";
// import { updateProduct } from "../product-list/productAPI";

function ProductForm() {
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const [openModal, setOpenModal] = useState(null);

  const Product = useSelector(selectedProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    if (params.id) dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    //  console.log(params.id)
    if (params.id && Product) {
      setValue("title", Product.title);
      setValue("description", Product.description);
      setValue("price", Product.price);
      setValue("discountPercentage", Product.discountPercentage);
      setValue("stock", Product.stock);
      setValue("brand", Product.brand);
      setValue("category", Product.category);
      setValue("thumbnail", Product.thumbnail);
      setValue("image-1", Product.images[0]);
      // product.images[1]?setValue("image-1",product.images[0]):null
      if (Product.images[1]) {
        setValue("image-2", Product.images[1]);
      }
      if (Product.images[1]) {
        setValue("image-3", Product.images[2]);
      }
      if (Product.images[1]) {
        setValue("image-4", Product.images[3]);
      }

      // console.log('dw',product)
    }
  }, [dispatch, Product]);

  const handleDelete = () => {
    const product = { ...Product };
    product.delete = true;
    dispatch(updateProductAsync(product));
    reset();
  };
  const handleRemove=()=>{

    handleDelete()
  }
  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          product.images = [
            product["image-1"],
            product["image-2"],
            product["image-3"],
            product["image-4"],
            product["thumbnail"],
          ];
          product.rating = Product.rating || 0;
          delete product["image-1"];
          delete product["image-2"];
          delete product["image-3"];
          delete product["image-4"];
          product.price = +product.price;
          product.discountPercentage = +product.discountPercentage;
          product.stock = +product.stock;

          // product["price"]=+product["price"],
          // product["discountPercentage"]=+product["discountPercentage"],
          // product["stock"]=+product["stock"],
          console.log(product);
          if (params.id) {
            product.id = +params.id;
            dispatch(updateProductAsync(product));
            console.log(11);
          } else {
            dispatch(createProductAsync(product));
          }

          reset();
        })}
        className="bg-white"
      >
        <div className="space-y-12 p-12">
          
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            {/* {
      "id"= 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,//
      "discountPercentage": 12.96,//
      "rating": 4.69,//
      "stock": 94,//
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]

      
    } */}
            <div className="mt-10 grid  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("title", {
                        required: "title is required",
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discription
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "discription is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="  col-span-6">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brands
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "brand is required",
                    })}
                  >
                    <option value=""> --Choose Brands-- </option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.value}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="Category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value=""> --Choose Category-- </option>
                    {categories.map((Category) => (
                      <option value={Category.value}>{Category.value}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("price", {
                        required: "price is required",
                        min: 1,
                        max: 10000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("discountPercentage", {
                        required: "discountPercentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-5">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-5">
                <label
                  htmlFor="Image-1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image-1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image-1", {
                        required: "image-1 is required",
                      })}
                      id="Image-1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-5">
                <label
                  htmlFor="Image-2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image-2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image-2", {
                        required: "image-2 is required",
                      })}
                      id="Image-2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-5">
                <label
                  htmlFor="Image-3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image-3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image-3", {
                        required: "image-3 is required",
                      })}
                      id="Image-3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-5">
                <label
                  htmlFor="Image-4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image-4
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image-4", {
                        required: "image-4 is required",
                      })}
                      id="Image-4"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/****************************************************************************************************************************************/}
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 space-y-10">
              <h1 className="flex">Extra</h1>
              <fieldset>
                <h1 className="text-sm flex font-semibold leading-6 text-gray-900">
                  By Email
                </h1>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center p-12 justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          {params.id && (
            <button
              onClick={(e)=>setOpenModal(1)}
              type="button"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              delete
            </button>
          )}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
     {useSelector(selectedProduct)&&<Modal
        title={`Delete ${Product.title}`}
        message="Are You sure want to delete this  Product ?"
        dangerOption="Delete"
        cancelOption="Cancel"
        showModal={openModal}
        cancelAction={() => setOpenModal(null)}
        dangerAction={handleRemove}
      ></Modal>}
    </>
  );
}

export default ProductForm;
