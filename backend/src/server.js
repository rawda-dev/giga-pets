import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.send("Giga Pets!");
});
app.listen(4000, () => {
  console.log("Server running on port 4000!");
});
