// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
import express from "express";
import axios from "axios";
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
let books = [
    {
        title: 'Lion King',
        date: '2025-01-24',
        rating: '5',
        notes: 'Nothing crazy',
    },
    {
        title: 'The Great Gatsby',
        date: '2025-01-12',
        rating: '8',
        notes: 'A classic that captures the essence of the roaring twenties.',
    },
    {
        title: 'To Kill a Mockingbird',
        date: '2025-01-18',
        rating: '9',
        notes: 'Profound and thought-provoking, a must-read.',
    },
    {
        title: '1984',
        date: '2025-01-05',
        rating: '10',
        notes: 'Dystopian brilliance, deeply chilling.',
    },
    {
        title: 'The Hobbit',
        date: '2025-01-20',
        rating: '7',
        notes: 'A whimsical adventure through Middle-earth.',
    },
    {
        title: 'Pride and Prejudice',
        date: '2025-01-08',
        rating: '9',
        notes: 'A timeless tale of love and social standing.',
    },
    {
        title: 'The Catcher in the Rye',
        date: '2025-01-15',
        rating: '6',
        notes: 'Raw and relatable, a dive into teenage angst.',
    },
    {
        title: 'Moby Dick',
        date: '2025-01-10',
        rating: '7',
        notes: 'A detailed and metaphorical seafaring tale.',
    },
    {
        title: 'Brave New World',
        date: '2025-01-17',
        rating: '8',
        notes: 'An unnervingly accurate vision of the future.',
    },
    {
        title: 'The Alchemist',
        date: '2025-01-22',
        rating: '10',
        notes: 'Inspiring and deeply spiritual, a journey for the soul.',
    },
];


const WEATHER_API_URL = "https://api.weatherbit.io/v2.0/current";
const WEATHER_API_KEY = "54a1150adefc4e759bc62e76ff3ad71a"; // Replace with your actual Weather API key
const BASE_URL = "https://date.nager.at/api/v3";



app.get("/", async (req, res) => {

    const result = await db.query("SELECT * FROM readBooks");
    books = result.rows;
    res.render("index.ejs", {books:books} );


    // res.render("index.ejs", { secret: "" ,user: ""});
});
app.get("/about", async (req, res) => {

        res.render("about.ejs", );

    // res.render("index.ejs", { secret: "" ,user: ""});
});
app.get("/services", async (req, res) => {

        res.render("service.ejs", );


    // res.render("index.ejs", { secret: "" ,user: ""});
});
app.get("/contact", async (req, res) => {

        res.render("contact.ejs", );
});
app.get('/newbook', (req, res) => {
    res.render('newbook.ejs',{listTitle:"Add a New Book"}); // Renders the newbook.ejs file
});
app.post('/add-book', (req, res) => {
    const { title, date, rating, notes } = req.body;
    const item = req.body.newItem;
    db.query("INSERT INTO readBooks (title,date,rating,notes) VALUES($1,$2,$3,$4)",[title, date, rating, notes]);
    res.redirect("/");
});
app.get("/delete", (req, res) => {
    const bookId = parseInt(req.query.id, 10);
    db.query("Delete FROM readBooks WHERE id = $1",[bookId],(err, result) => {
        if (err) {
            console.error("Error updating item:", err.stack);
        } else {
            console.log("Item updated successfully!");
            res.redirect("/");
        }
    });
});
app.get("/edit", async (req, res) => {
    const bookId = parseInt(req.query.id, 10); // Ensure bookId is an integer
    const result = await db.query("SELECT * FROM readBooks WHERE id = $1", [bookId]); // Use parameterized queries to prevent SQL injection

    console.log(result.rows[0]); // This will log the fetched book

    if (result.rows.length > 0) {
        res.render("editBook.ejs", { book: result.rows[0] }); // Pass the first row to the template
    } else {
        res.status(404).send('Book not found'); // Handle case if no book is found
    }
});
app.post('/edit-book', (req, res) => {
    const { title, date, rating, notes } = req.body;
    const id = parseInt(req.query.id, 10);
    const item = req.body.newItem;
    db.query("UPDATE readBooks SET title = $1 , date = $2 , rating= $3 , notes = $4 WHERE id = $5",[title, date, rating, notes,id]);
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

