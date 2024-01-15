// A mock function to mimic making an async request for data
 

export function addOrder(order) {
  return new Promise(async(resolve) =>{
    const response = await fetch("http://localhost:8080/orders",{
      method:"POST",
      body: JSON.stringify(order),
      headers:{"content-type":"Application/json"},
    })
    const data = await response.json();
    resolve({data});
  }
  );
}


export function fetchAllOrders(paging) {
  return new Promise(async(resolve) =>{
     let queryString = '';
    for (let key in paging) {
      queryString += `${key}=${paging[key]}&`;
    }
    const response = await fetch("http://localhost:8080/orders?"+queryString);
    const totalOrders = response.headers.get("X-Total-Count");

    const data = await response.json();
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

export function updateOrder(update) {
  return new Promise(async(resolve) =>{
    const response = await fetch("http://localhost:8080/orders/"+update.id,{
      method:"PATCH",
      body: JSON.stringify(update),
      headers:{"content-type":"Application/json"},
    })
    const data = await response.json();
    resolve({data});
  }
  );
}
// for (let key in sort) {
//   queryString += `${key}=${sort[key]}&`;
// }
// const response = await fetch(
//   "http://localhost:8080/products?" + queryString
// );

export function fetchOrdersByFilter(sort) {
  return new Promise(async(resolve) =>{
     let queryString = '';
     for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
      }
      console.log("4444",queryString)
      const response = await fetch("http://localhost:8080/orders?" + queryString);

    const data = await response.json();
    resolve({data});
  });
}




















