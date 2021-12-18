import { Client } from "pg";

export const client = new Client({
    database: "restaurant-rating",
    port: 5432
})