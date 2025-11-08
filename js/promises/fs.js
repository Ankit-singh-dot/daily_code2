import fs from "fs";
function readFilePromisified(path, encoding = "utf8") {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFilePromisified("file.txt")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
