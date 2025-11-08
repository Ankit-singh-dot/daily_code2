// Promisified version of fetch => 
function fetchPromisified(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) reject("http error");
        else resolve(response.json());
      })
      .catch((err) => reject(err));
  });
}

fetchPromisified("https://dummyjson.com/products")
  .then((data) => console.log(data))
  .catch((err) => {
    console.log(err);
  });
