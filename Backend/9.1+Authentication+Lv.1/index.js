import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password} = req.body;

  db.query("INSERT INTO userInfo ( email, password) VALUES($1,$2)",[ username, password]);
  res.redirect("/");
});

app.post("/login", async (req, res) => {
  const { username, password} = req.body;
  const result = await db.query("SELECT * FROM userInfo");
  let users = result.rows;
  console.log(users);

  for(let i = 0;i<users.length;i++)
  {
    let user = users[i];
    if(user.email === username && user.password === password)
    {
      return res.render("secrets.ejs");
    }
  }
  res.render("login.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
