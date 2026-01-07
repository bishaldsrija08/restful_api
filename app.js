const express = require('express');
const app = express();

// Ejs setup
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

let posts = [{
    username: "bishaldsrijal",
    title: "My first post"
},
{
    username: "john_doe",
    title: "Hello World!"
},
{
    username: "jane_smith",
    title: "Express is great!"
}]

// post api
app.post("/posts", (req, res) => {
    const { username, title } = req.body;
    posts.push({username, title})
    res.redirect("/");
})

// get post form
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs")
})

// get api
app.get("/", (req,res)=>{
    res.render("index.ejs", {data: posts})
})

// Get single post
app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    res.render("post.ejs", {data: post, id: id})
})

// delete post
app.get("/posts", (req, res) => {
    const id = req.query.id;
    posts.splice(id, 1);
    res.redirect("/");
})

// get update form
app.get("/posts/edit/:id", (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    res.render("edit.ejs", {data: post, id: id})
})

// update post
app.post("/posts/update/:id", (req,res)=>{
    const id = req.params.id
    const {username, title}= req.body;
    posts[id]= {username, title};
    res.redirect("/");
})












app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})