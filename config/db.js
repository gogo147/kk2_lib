const sqlite = require("sqlite3").verbose();
const libraryTable = `CREATE TABLE IF NOT EXISTS books ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, author TEXT, genre TEXT, quote TEXT)`;
/*const md5 = require('md5');*/
const db = new sqlite.Database("./gm.sqlite", (error) => {
    if (error) { console.error(error.message); throw error; }});
db.run(libraryTable, (error) => {
    if (error) { console.error(error.message); throw error; }
    const info = "INSERT INTO books (title, author, genre, quote) VALUES (?, ?, ?, ?)"
    db.run(info, ["Jag är Zlatan Ibrahimović", "David Lagercrantz", "biografi", "You bought a Ferrari but you drive it like a Fiat"], (error) => 
    { if (error){ console.error(error.message); }
    })
})
module.exports = db;