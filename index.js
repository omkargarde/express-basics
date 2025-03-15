import cors from "cors";
import express from "express";
import errorMiddleware from "./middleware/error.middleware.js";
import loggerMiddleware from "./middleware/logger.middleware.js";
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

// custom middlewares
app.use(loggerMiddleware);
// has to be last always
app.use(errorMiddleware);

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  req.log.info("hello world");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `\nserver is listening on port ${process.env.BASE_URL}:${port} \n`
  );
});
