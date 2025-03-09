
#[docs]([https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded])

the **express.json()** and **express.urlencoded()** middleware are used for **POST** and **PUT** http method specifically where we are accepting data from the client

**express.json** is used to parse the request body except for html form data

**express.urlencoded** is used to parse the body parser html form data

## example

```html
<form action="/" method="POST">
    <input type="text" name="username">
    <button>Submit</button>
</form>
```

```javascript
const express = require('express')
const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))


app.get("/", (req, res) => {
    res.sendFile("index.html")
})

app.post("/", (req, res) => {
    res.send(req.body)
})


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server Up in Port ${port}`);
})
```

It will send {} after you click submit. But if you uncommented app.use(express.urlencoded({extended: false})), then you will get {"username": "dean"}.

So the difference is express.json() is a body parser for post request except html post form and express.urlencoded({extended: false}) is a body parser for html post form.
