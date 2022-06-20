const db = require("../config/db");
const keys = ["title", "author", "genre", "quote"];

function getData() {
const library = "SELECT * FROM books"
return new Promise((resolve, reject) => {
    db.all(library, (error, rows) => 
    {if (error) { console.error(error.message); reject(error); }
        resolve(rows);})
})}
function getSpecificData(id) {
    const library = "SELECT * FROM books WHERE id =?"
    return new Promise((resolve, reject) => {
        db.all(library, id, (error, rows) => 
        {if (error) { console.error(error.message); reject(error); }
            resolve(rows);})
    })}
function postData(data) {
	const uniqueInfo = [...keys.map((key) => data[key])];
    const library = "INSERT INTO books (title, author, genre, quote) VALUES (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.run(library, uniqueInfo, (error) => 
        {if (error) { console.error(error.message); res.status(400); reject(error); }
            resolve();})
    })}
function patchData(id, data) {
    const uniqueInfo = [...keys.map((key) => data[key]), id];
    const library = `UPDATE books SET title = ?, author = ?, genre = ?, quote = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(library, uniqueInfo, (error) => 
        {if (error) { console.error(error.message); res.status(400); reject(error); }
            resolve();})
    })}
function patchSpecificData(id, data) {
    const uniqueInfo = [...keys.map((key) => data[key]), id];
    const library = `UPDATE books SET title = coalesce(?, title), author = coalesce(?, author), genre = coalesce(?, genre), quote = coalesce(?, quote) WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(library, uniqueInfo, (error) => 
        {if (error) { console.error(error.message); res.status(400); reject(error); }
            resolve();})
    })}
    function deletedata(id) {
        const library = "DELETE FROM books WHERE id = ?"
        return new Promise((resolve, reject) => {
            db.run(library, id, (error) => 
            {if (error) { console.error(error.message); res.status(400); reject(error); }
                resolve();})
        })}
module.exports = {
  getData, getSpecificData, postData, patchData, patchSpecificData, deletedata
}