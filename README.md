# Express.js Todo API

This is a simple RESTful API built with Express.js and MongoDB, allowing you to manage a list of todos.

## Features

*   **Create Todos:** Add new todos with a title.
*   **Get All Todos:** Retrieve a list of all existing todos.
*   **Get Todo by ID:** Retrieve a specific todo by its ID.
*   **Update Todo:** Modify the title and/or completion status of an existing todo.
*   **Delete Todo:** Remove a todo from the list.

## Prerequisites

*   **Node.js and npm:** Make sure you have Node.js and npm (or yarn) installed. You can check by running `node -v` and `npm -v` in your terminal.
*   **MongoDB:** You need a running MongoDB instance. You can either:
    *   Install MongoDB locally on your machine.
    *   Use a cloud-based MongoDB service like MongoDB Atlas.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <your_repository_url>
    cd express-basics
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**

    *   Create a `.env` file in the root directory of the project (if it doesn't already exist).
    *   Add the following environment variables to the `.env` file:

        ```plaintext
        PORT=your-port
        IS_PROD=your-is_prod
        MONGO_CONNECTION_STRING=your-mongo_connection_string
        ```

## Running the Server

1.  **Development mode**

    ```bash
    npm run dev
    ```

    *   This command will start the server using nodemon. `nodemon` will automatically restart the server when it detects changes in your code.
2. **Production mode**
    ```bash
    npm start
    ```
    * This command will start the server.

3. **Check if the server is running:**
    * The server will start listening on port specified in your `.env` file (default is `5000`).
    * You will see this message in your terminal `serve is listening  on port <port>`
    * You can access the base route `http://localhost:<your_port>` to see the hello world message.

## API Endpoints## Project Structure

### Todos

*   **GET `/api/v1/todos`**
    *   Retrieves all todos.
    *   Response:
        ```json
        {
            "success": true,
            "message": "Todos retrieved successfully",
            "todos": [
                {
                    "_id": "65f5cd32c5b6f9898f9d1d3b",
                    "title": "Sample Todo",
                    "isCompleted": false,
                    "createdAt": "2024-03-16T15:00:00.000Z",
                    "updatedAt": "2024-03-16T15:00:00.000Z"
                },
                // ... more todos
            ]
        }
        ```
    * If there are no todos
        ```json
         {
            "success": false,
            "message": "No Todos found",
            "todos": []
        }
        ```

*   **GET `/api/v1/todos/:id`**
    *   Retrieves a todo by its ID.
    *   Response:
        ```json
        {
            "success": true,
            "message": "Todos retrieved successfully",
            "todos": {
                "_id": "65f5cd32c5b6f9898f9d1d3b",
                "title": "Sample Todo",
                "isCompleted": false,
                "createdAt": "2024-03-16T15:00:00.000Z",
                "updatedAt": "2024-03-16T15:00:00.000Z"
            }
        }
        ```
    * if Todo not found
        ```json
         {
            "success": false,
            "message": "Todo not found",
            "todo": null
        }
        ```
*   **POST `/api/v1/todos/:title`**
    *   Creates a new todo with the given title.
    *   Response:
        ```json
        {
            "success": true,
            "message": "Successfully created Todo",
            "todo": {
                "_id": "65f5cd32c5b6f9898f9d1d3b",
                "title": "Sample Todo",
                "isCompleted": false,
                "createdAt": "2024-03-16T15:00:00.000Z",
                "updatedAt": "2024-03-16T15:00:00.000Z"
            }
        }
        ```

*   **PATCH `/api/v1/todos/id/:id/title/:title/isCompleted/:isCompleted`**
    *   Updates a todo by its ID.
    *   `isCompleted` should be `true` or `false`.
    *   Response:
        ```json
        {
            "success": true,
            "message": "Successfully updated Todo",
            "todo": {
                "_id": "65f5cd32c5b6f9898f9d1d3b",
                "title": "Updated Todo",
                "isCompleted": true,
                "createdAt": "2024-03-16T15:00:00.000Z",
                "updatedAt": "2024-03-16T16:00:00.000Z"
            }
        }
        ```
    * If todo not found
        ```json
        {
            "success": false,
            "message": "Todo not found",
            "todo": null
        }
        ```

* **DELETE `/api/v1/todos/:id`**
    * Deletes a todo by its ID
    * Response:
         ```json
        {
            "success": true,
            "message": "Successfully deleted Todo",
            "todo": {
                "_id": "65f5cd32c5b6f9898f9d1d3b",
                "title": "Sample Todo",
                "isCompleted": true,
                "createdAt": "2024-03-16T15:00:00.000Z",
                "updatedAt": "2024-03-16T16:00:00.000Z"
            }
        }
        ```
    * If todo not found
        ```json
        {
            "success": false,
            "message": "Todo not found",
            "todo": null
        }
        ```


