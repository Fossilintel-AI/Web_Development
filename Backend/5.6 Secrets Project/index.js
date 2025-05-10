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

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/random";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/


const yourBearerToken = "a5afe158-72e5-48ea-b8f6-5a95fe77098e";
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL, config);
        const data = result.data;
        console.log(data.secret);
        res.render("index.ejs", { secret:data.secret,user: data.username  });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }

    // res.render("index.ejs", { secret: "" ,user: ""});
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

