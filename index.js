import cors from "cors";
import express from "express";
import { todoRouter } from "./routes/todo.route.js";
import { connectToMongo } from "./utils/db.js";
const app = express();
const port = process.env.PORT ?? 5000;

connectToMongo();

// allowed all origin
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api/v1/todos", todoRouter);

app.listen(port, () => {
	console.log(`\nserve is listening  on port ${port} \n`);
});
