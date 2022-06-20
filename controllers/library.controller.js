const db = require("../config/db");
const model = require("../models/library.model");

async function getBooks(req, res) {
  try { const tot = await model.getData();
    res
      .status(201).json({ status: "YAY", data: tot, message: "I started reading a book about anti-gravity. It’s impossible to put down. Ba dum tss" });
  } catch (error) {
    res
      .status(401).json({ status: "NAY", message: "Sorry i'm booked" });
  }}
async function getBook(req, res) {
  const id = req.params.id;
  try {
    const specBook = await model.getSpecificData(id);
    if (!specBook) throw new Error(`Book: ${id} was not found`);
    res.status(201).json({ status: "YAY", message: "I like big books and I cannot lie", data: specBook });
  } catch (error) {
    res.status(401).json({ status: "NAY", message: "This library is overbooked" });
  }}
async function postBook(req, res) {
  try {
    const addBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      quote: req.body.quote,
    };
    await model.postData(addBook);
    res.status(201).json({ status: "YAY", message: "READ, because dinosaurs didn’t read. Now they’re extinct.", data: addBook });
  } catch (err) {
    res.status(401).json({ status: "NAY", message: "This library is overbooked" });
  }}
async function putBook(req, res) {
  const id = req.params.id;
  try {
    const change = await model.getSpecificData(id);
    if (!change) throw new Error(`Book: ${id} was not found`);
    await model.patchData(id, req.body);
    res.status(201).json({ status: "YAY", data: req.body, message: "Correct data has been added" });
  } catch (err) {
    res.status(401).json({ status: "NAY", message: "Sorry unable to change the data" });
  }}
async function patchBook(req, res) {
  const id = req.params.id;
  try {
    const change = await model.getSpecificData(id);
    if (!change) throw new Error(`Book: ${id} was not found`);
    await model.patchSpecificData(id, req.body);
    res.status(201).json({ status: "YAY", data: req.body, message: "Correct data has been added" });
  } catch (err) {
    res.status(401).json({ status: "NAY", message: "Sorry unable to change the data" });
  }}
async function deleteBook(req, res) {
  const id = req.params.id;
  try {
    const erased = await model.getSpecificData(id);
    if (!id === !erased) throw new Error(`Book: ${id} was not found`);
    await model.deletedata(id);
    res.status(201).json({ status: "YAY", data: erased, message: "You have erased the book" });
  } catch (err) {
    res.status(404).json({ status: "NAY", message: "Sorry unable to erased the book" });
  }}
module.exports = {
  getBooks, getBook, postBook, putBook, patchBook,deleteBook,
};
