import express from "express";
import {
	createTodo,
	deleteTodo,
	getAllTodos,
	getTodoById,
	updateTodo,
} from "../controllers/todo.controller.js";

export const todoRouter = express.Router();

todoRouter.get("/", getAllTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.delete("/:id", deleteTodo);
todoRouter.post("/:title", createTodo);
todoRouter.patch("/id/:id/title/:title/isCompleted/:isCompleted", updateTodo);
