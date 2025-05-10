import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Mankael123456",
  port: 5432,
});
db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.stack);
  } else {
    console.log("Connected to the database.");
  }
});

let items = [
  // { id: 1, title: "Buy milk" },
  // { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {

  const result = await db.query("SELECT * FROM items");
  items = result.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  db.query("INSERT INTO items (title) VALUES($1)",[item]);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  console.log(req.body);
  db.query("UPDATE items SET title = $1 WHERE id = $2",[req.body.updatedItemTitle,req.body.updatedItemId],(err, result) => {
    if (err) {
      console.error("Error updating item:", err.stack);
    } else {
      console.log("Item updated successfully!");
      res.redirect("/");
    }
  });
});

app.post("/delete", (req, res) => {
  console.log(req.body);
  db.query("Delete FROM items WHERE id = $1",[req.body.deleteItemId],(err, result) => {
    if (err) {
      console.error("Error updating item:", err.stack);
    } else {
      console.log("Item updated successfully!");
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
