import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = {
    hmtlCode:  "<h1>Enter Your name below</h1>",
  };

  res.render("index.ejs",data
      );
});

app.post("/submit", (req, res) => {
  let message ="<h1>There are " + (req.body["fName"].length + req.body["lName"].length)+ " letters in your name</h1>";
  const data = {
    hmtlCode:  message,
  };
  res.render("index.ejs",data
  );

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
