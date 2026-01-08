const express = require('express');
const app = express();

// method-override setup
const methodOverride = require('method-override');

const { v4: uuidv4 } = require('uuid');

// Ejs setup
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let posts = [{
    id: uuidv4(),
    username: "bishaldsrijal",
    title: "My first post"
},
{
    id: uuidv4(),
    username: "john_doe",
    title: "Hello World!"
},
{
    id: uuidv4(),
    username: "jane_smith",
    title: "Express is great!"
}]

// post api
app.post("/posts", (req, res) => {
    const { username, title } = req.body;
    const id = uuidv4();
    posts.push({ id, username, title })
    res.redirect("/");
})

// get post form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

// get api
app.get("/", (req, res) => {
    res.render("index.ejs", { data: posts })
})

// Get single post
app.get("/posts/:id", (req, res) => {
    const id = req.params.id;

    //     - Searches the `posts` array to find the post with the matching `id`.
    // - `find()`:
    //   - Loops through each post
    //   - Returns the **first post** where `p.id === id`
    // - If no post is found, `post` will be `undefined`.

    const post = posts.find(p => p.id === id)
    res.render("post.ejs", { data: post, id: id })
})

// delete post
app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
// Removes the post with the matching ID.
// filter():
// Loops through each post p
// Keeps only posts whose ID does NOT match the given id
// The matching post is excluded, effectively deleting it.
// A new array is created and reassigned to posts.    
    posts = posts.filter((p)=> id!== p.id)
    res.redirect("/");
})

// get update form
app.get("/posts/edit/:id", (req, res) => {
    const id = req.params.id;
    const post = posts.find(p => p.id === id)
    res.render("edit.ejs", { data: post, id: id })
})

// update post
app.patch("/posts/update/:id", (req, res) => {
    const id = req.params.id
    const { username, title } = req.body;
    console.log(username, title)
    const post = posts.find(p => p.id === id)
    console.log(post)
    if (post) {
        post.username = username;
        post.title = title;
    }
    res.redirect("/");
})












app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})