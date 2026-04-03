import express from "express";
const app = express();
app.get("/healthCheck", (req, res) => {
  res.send("yes server is up");
});
app.listen(4000, () => {
  console.log("listening to the port 4000");
});
