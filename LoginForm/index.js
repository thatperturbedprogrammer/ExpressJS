import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const app = express();
const port = 3000;

// to get file path
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + '/public'));
// mounting Middleware for parsing body
app.use(bodyParser.urlencoded({extended: true}));

// logging
app.use(morgan('dev'));

// app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');


app.post("/", (req, res) => {
    console.log(req.body["email"]);
    console.log(req.body["password"]);
    const userdata = {
        email: req.body["email"],
        password: req.body["password"]
    };
    res.render("index", {
        userdata: userdata
    })
})

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`);
});