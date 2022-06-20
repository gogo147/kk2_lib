const express = require("express");
const app = express();
app.use(express.json());
const libR = require("./routers/library.router")
app.use(libR);
const port = 8000;

app.listen(port, () => {
  console.log(`Port is running on ${port}`)
});