import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Database connection configuration
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Mankael123456",
  port: 5432,
});

// Variables for storing country data
let visisted_countries = [];
let all_countries = [];

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Establish the database connection once
db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.stack);
  } else {
    console.log("Connected to the database.");
  }
});

// Routes
app.get("/", async (req, res) => {
  // Fetch visited countries
  db.query("SELECT country_code FROM visited_countries", (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
      visisted_countries = result.rows.map((country) => country.country_code);
      console.log(visisted_countries);
    }

    // Render the page
    res.render("index.ejs", {
      countries: visisted_countries,
      total: visisted_countries.length,
    });
  });
});

app.post("/add", async (req, res) => {
  const userInput = req.body.country;
  console.log(userInput);

  // Fetch all countries and check for the user input
  db.query("SELECT * FROM countries", (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
      result.rows.forEach((country) => {
        if (country.country_name.toLowerCase() === userInput.toLowerCase()) {
          console.log("There is progress");

          // Insert into visited countries
          db.query(
              "INSERT INTO visited_countries (country_code) VALUES($1)",
              [country.country_code],
              (insertErr) => {
                if (insertErr) {
                  console.error(
                      "Error inserting into visited_countries",
                      insertErr.stack
                  );
                }
              }
          );
        }
      });
    }

    // Redirect after processing
    res.redirect("/");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
