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

app.get<{id: number}, {}, {}>("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const text = "SELECT * FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id WHERE restaurants.id = $1;"
    const dbres = await client.query(text, [id]);
    res.status(200).json({
        status: "success",
        message: `The response body contains more information about restaurant with ID = ${id}.`,
        response: dbres.rows
    });
});

app.post<{}, {}, {name: string, street: string, city: string, postcode: string}>("/restaurants", async (req, res) => {
    const { name, street, city, postcode } = req.body;
    const text1 = "INSERT INTO restaurants (name) VALUES ($1) RETURNING *;"
    const dbres1 = await client.query(text1, [name]);
    const newRestaurantId = dbres1.rows[0].id;
    const text2 = "INSERT INTO addresses (restaurant_id, street, city, postcode) VALUES ($1, $2, $3, $4) RETURNING *;"
    const dbres2 = await client.query(text2, [newRestaurantId, street, city, postcode]);
    res.status(203).json({
        status: "success",
        message: `Restaurant has been created with ID ${newRestaurantId}.`,
        response: dbres2.rows
    });
});

app.post<{id: number}, {}, {comment: string, score: number}>("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const { comment, score } = req.body;
    const text = "INSERT INTO reviews (restaurant_id, comment, score) VALUES ($1, $2, $3) RETURNING *;"
    const dbres = await client.query(text, [id, comment, score]);
    res.status(203).json({
        status: "success",
        message: `Comment has been added to restaurant with ID ${dbres.rows[0].restaurant_id}.`,
        response: dbres.rows
    });
})

});
