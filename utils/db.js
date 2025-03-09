import mongoose from "mongoose";

export async function connectToMongo() {
	try {
		mongoose.connection.on("connected", () =>
			console.log(
				`connected to mongo at port ${mongoose.connection.host}:${mongoose.connection.port} \n`,
			),
		);
		mongoose.connection.on("reconnected", () =>
			console.log(
				`reconnected to mongo at port ${mongoose.connection.host}:${mongoose.connection.port} \n`,
			),
		);

		mongoose.connection.on("disconnected", () =>
			console.log("disconnected from mongo"),
		);
		await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
	} catch (error) {
		console.error("\n failed to connect to mongo \n\n", error);
	}
}
