import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "title is required"],
		},
		isCompleted: {
			type: Boolean,
			required: [true, "isCompleted is required"],
		},
	},
	{ timestamps: true },
);

export const Todo = mongoose.model("Todo", todoSchema);
