// A mock function to mimic making an async request for data

export function fetchAllProductsFilter({ filter, sort, paging }) {
  return new Promise(async (resolve) => {
    let queryString = "";
    for (let key in filter) {
      let ct = filter[key];

      for (let i = 0; i < ct.length; i++) {
        queryString += `${key}=${ct[i]}&`;
      }
    }
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    for (let key in paging) {
      queryString += `${key}=${paging[key]}&`;
    }

    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const totalItem = await response.headers.get("X-Total-Count");

    const data = await response.json();
    resolve({ data: { products: data, totalItem: +totalItem } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // Use the fetch API to make a GET request to the specified endpoint
    const response = await fetch("http://localhost:8080/products/" + id);

    // Parse the response data as JSON
    const data = await response.json();

    // Resolve the promise with the data retrieved
    resolve({ data });

  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(update) {
  return new Promise(async(resolve) =>{
    const response = await fetch("http://localhost:8080/products/"+update.id,{
     method:'PATCH',
     body: JSON.stringify(update),
      headers:{'content-type':'application/json'},
    });
    const data = await response.json();
    resolve({data});
  }
  );
}