const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "goodreads.db");
console.log(dbPath);
const app = express();
let db = null;
const initializerSqlAndDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("SErver started running");
    });
  } catch (e) {
    console.log("Error occured !Server not found");
    present.exit(1);
  }
};
initializerSqlAndDb();
app.get("/books/", async (request, response) => {
  let books = `SELECT * FROM book ORDER BY book_id;`;
  const booksArray = await db.all(books);
  response.send(booksArray);
});
