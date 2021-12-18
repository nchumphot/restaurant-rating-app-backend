import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { client } from "./db/db";

const app = express();

app.use(express.json());
app.use(cors());
config();

client.connect().then(() => {
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}!`));

app.get("/", async (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Veta's server"
    });
});

app.get("/restaurants", async (req, res) => {
    const text = "SELECT restaurants.*, addresses.street, addresses.city, addresses.postcode FROM restaurants JOIN addresses ON restaurants.id = addresses.restaurant_id;"
    const dbres = await client.query(text);
    res.status(200).json({
        status: "success",
        message: "The response body contains all the restaurants.",
        response: dbres.rows
    });
});
});
