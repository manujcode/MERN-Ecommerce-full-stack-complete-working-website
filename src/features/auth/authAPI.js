// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}
export function checkUser(loggedData) {
  return new Promise(async (resolve, reject) => {
    const email = loggedData.email;
    const password = loggedData.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);

    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "wrong credentials" });
      }
    } else {
      reject({ message: "user Not Found " });
    }
  });
}


export function signOut() {
  return new Promise(async (resolve) => {
    resolve({data: 'success' }); 
  });
}



