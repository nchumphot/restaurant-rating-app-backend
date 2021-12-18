import { Client } from "pg";

const client = new Client({
    database: "restaurant-rating",
    port: 5432
})