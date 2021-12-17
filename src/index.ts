import express from "express";
import cors from "cors";
import { config } from "dotenv";

const app = express();

app.use(express.json());
app.use(cors());
config();

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}!`));

app.get("/", async (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Veta's server"
    })
});