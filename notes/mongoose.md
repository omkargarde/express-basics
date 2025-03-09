to connect to mongo using mongoose

```javascript
    export async function connectToMongo() {
	try {
		await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
	} catch (error) {
		console.error("\n failed to connect to mongo \n\n", error);
	}
}
```

to add listener to mongoose for checking the connection status we can add.
side note:these listener have to be before mongoose.connect().
[docs](https://mongoosejs.com/docs/connections.html)

```javascript
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));
```