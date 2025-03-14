import cors from "cors";
import express from "express";
import { todoRouter } from "./routes/todo.route.js";
import { userRouter } from "./routes/user.route.js";
import { connectToMongo } from "./utils/db.js";

const app = express();
const port = process.env.PORT ?? 5000;

connectToMongo();

// allowed all origin
app.use(cors());
// to parse all json data except html formData
app.use(express.json());
// to parse all json data in html formData
app.use(express.urlencoded({ extended: true }));

// maybe implement health checker or documentation
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(
    `\nserver is listening on port ${process.env.BASE_URL}:${port} \n`
  );
});
