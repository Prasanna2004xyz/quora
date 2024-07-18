const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const { ppid } = require('process');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

let port = 3000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

let posts = [
    { id: uuidv4(), username: "prasanna", content: "I love coding" },
    { id: uuidv4(), username: "prassu", content: "Eat five star do nothing" },
    { id: uuidv4(), username: "bali", content: "Tailoring is my passion" },
    { id: uuidv4(), username: "Hanuma", content: "I love lifting weights" }
];

app.get('/posts', (req, res) => {
    res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new');
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (post) {
        res.render('show', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/posts/:id/edit', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (post) {
        res.render('edit', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.patch('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = posts.find(p => p.id === id);
    if (post) {
        post.content = content;
        res.redirect(`/posts/${id}`);
    } else {
        res.status(404).send('Post not found');
    }
});

app.delete('/posts/:id',(req,res)=>{
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/posts');
})

app.post('/posts', (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});
