const express = require("express");
const app = express();
app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "health is up",
  });
});
app.listen(2410, () => {
  console.log("server ef qjnwef b qewnfihqwebfqwfn  fqlwefnjknf qkwjfgjq gfn qregibqherg oehuwfbhqevfohqwf jhwefohbwhe port 2410");
});
