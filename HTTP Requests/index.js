import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log(req.rawHeaders);
    res.send("Hello, World!");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Me</h1><p>My name is Siddhant</p>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Me</h1><p>Phone: +91 123456789");
});

app.listen(3000, ()=>{
    console.log(`Server is running on port ${port}`);
});
