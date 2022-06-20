const express = require('express');
const libStorage = express.Router();
const libControll = require("../controllers/library.controller");


libStorage.get("/books", libControll.getBooks);

libStorage.get("/books/:id", libControll.getBook);

libStorage.post("/books", libControll.postBook);

libStorage.put("/books/:id", libControll.putBook);

libStorage.patch("/books/:id", libControll.patchBook);

libStorage.delete("/books/:id", libControll.deleteBook);

module.exports = libStorage;