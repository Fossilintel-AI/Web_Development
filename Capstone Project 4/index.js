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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const WEATHER_API_URL = "https://api.weatherbit.io/v2.0/current";
const WEATHER_API_KEY = "54a1150adefc4e759bc62e76ff3ad71a"; // Replace with your actual Weather API key
const BASE_URL = "https://date.nager.at/api/v3";
const sportAPI = "81e1781b3a8040f6b71f78748e233696";
app.get("/", async (req, res) => {
    res.render("index.ejs", );


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


    // res.render("index.ejs", { secret: "" ,user: ""});
});


app.get("/weather", async (req, res) => {
    const { queryType, lat, lon, city, postal_code, country } = req.query;

    try {
        // Validate the query parameters based on query type
        let apiUrl = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}`;

        if (queryType === "latlon") {
            if (!lat || !lon) {
                return res.render("weather.ejs", { data: null, error: "Latitude and Longitude are required for this query type." });
            }
            apiUrl += `&lat=${lat}&lon=${lon}`;
        } else if (queryType === "city") {
            if (!city) {
                return res.render("weather.ejs", { data: null, error: "City name is required for this query type." });
            }
            apiUrl += `&city=${city}`;
        } else if (queryType === "postal") {
            if (!postal_code || !country) {
                return res.render("weather.ejs", { data: null, error: "Postal code and country are required for this query type." });
            }
            let countryy;
            if (typeof country !== "string") {
                countryy = String(country); // Safeguard: Convert to a string if needed
            }


            let resultString = countryy.replace(",", "");
            apiUrl += `&postal_code=${postal_code}&country=${resultString}`;
        } else {
            return res.render("weather.ejs", { data: null, error: "Please select a valid query type." });
        }
        console.log(apiUrl);
        const result = await axios.get(apiUrl);


        if (result.data && result.data.data && result.data.data.length > 0) {
            const weatherData = result.data.data[0]; // Extract the first item from the 'data' array
            res.render("weather.ejs", { data: weatherData, error: null });
        } else {
            res.render("weather.ejs", { data: null, error: "No weather data found for the specified location." });
        }
    } catch (error) {
        console.error(error.message);
        res.render("weather.ejs", {
            data: null,
            error: "Unable to fetch weather data. Please try again later.",
        });
    }
});

// Route to fetch available countries
app.get("/calendar", async (req, res) => {
    try {
        const { data: countries } = await axios.get(`${BASE_URL}/AvailableCountries`);
        res.render("calendar.ejs", { countries, holidays: null, selectedCountry: null, error: null });
    } catch (error) {
        console.error("Error fetching available countries:", error.message);
        res.render("calendar.ejs", { countries: [], holidays: null, selectedCountry: null, error: "Unable to fetch countries." });
    }
});


// Route to fetch public holidays for a selected country
app.get("/calendar/holidays", async (req, res) => {
    const { countryCode } = req.query;
    try {
        const { data: countries } = await axios.get(`${BASE_URL}/AvailableCountries`);
        const { data: holidays } = await axios.get(`${BASE_URL}/NextPublicHolidays/${countryCode}`);
        res.render("calendar.ejs", { countries, holidays, selectedCountry: countryCode, error: null });
    } catch (error) {
        console.error("Error fetching holidays:", error.message);
        res.render("calendar.ejs", { countries: [], holidays: null, selectedCountry: countryCode, error: "Unable to fetch holidays." });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

