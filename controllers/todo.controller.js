import { Todo } from "../models/todo.model.js";

export const getAllTodos = async (req, res) => {
	try {
		const todos = await Todo.find({});
		if (!todos || todos.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No Todos found",
				todos: [],
			});
		}
		return res.status(200).json({
			success: true,
			message: "Todos retrieved successfully",
			todos: todos,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error });
	}
};

export const getTodoById = async (req, res) => {
	const { id: reqId } = req.params;
	if (!reqId) {
		console.error("id is not provided, returning error");
		return res.status(400).json({ error: "id is required" });
	}
	try {
		const todo = await Todo.findById(reqId);
		if (!todo) {
			return res.status(404).json({
				success: false,
				message: "Todo not found",
				todo: null,
			});
		}
		return res.status(200).json({
			success: true,
			message: "Todos retrieved successfully",
			todos: todo,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error });
	}
};

export const createTodo = async (req, res) => {
	const { title } = req.params;
	if (!title) {
		console.error("title is not provided, returning error");
		return res.status(400).json({ error: "title is required" });
	}
	try {
		const newTodo = {
			title: title,
			isCompleted: false,
		};
		const todos = await Todo.create({
			...newTodo,
		});
		if (!todos) {
			return res.status(400).json({
				success: false,
				message: "Problem creating Todo",
				todo: null,
			});
		}
		return res.status(201).json({
			success: true,
			message: "Successfully created Todo",
			todo: todos,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error });
	}
};

export const updateTodo = async (req, res) => {
	const { id: reqId, title, isCompleted } = req.params;
	if (!title || !isCompleted || !reqId) {
		console.error(
			"title or isCompleted or id is not provided, returning error",
		);
		return res.status(400).json({ error: "something went wrong" });
	}
	try {
		const updatedTodo = await Todo.findByIdAndUpdate(
			reqId,
			{ title: title, isCompleted: isCompleted },
			{ new: true }, // require if response is required
		);
		if (!updatedTodo) {
			return res.status(404).json({
				success: false,
				message: "Todo not found",
				todo: null,
			});
		}
		return res.status(200).json({
			success: true,
			message: "Successfully updated Todo",
			todo: updatedTodo,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error });
	}
};
export const deleteTodo = async (req, res) => {
	const { id: reqId } = req.params;
	if (!reqId) {
		console.error("id is not provided, returning error");
		return res.status(400).json({ error: "is is not provided" });
	}
	try {
		const deletedTodo = await Todo.findByIdAndDelete(
			reqId,
			{ new: true }, // require if response is required
		);
		if (!deletedTodo) {
			return res.status(404).json({
				success: false,
				message: "Todo not found",
				todo: null,
			});
		}
		return res.status(200).json({
			success: true,
			message: "Successfully deleted Todo",
			todo: deletedTodo,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error });
	}
};
