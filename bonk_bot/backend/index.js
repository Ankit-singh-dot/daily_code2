import express from "express";
const app = express();
app.post("api/vi/signup", (req, res) => {
  res.json({
    message: "signup",
  });
});
app.post("api/vi/signin", (req, res) => {
  res.json({
    message: "signin",
  });
});
app.post("api/vi/txn/signin", (req, res) => {
  res.json({
    message: "signin",
  });
});
app.get("api/vi/txn", (req, res) => {
  res.json({
    message: "signin",
  });
});
app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});
