const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

//express app
const app = express();

// connect to mongoDB
const dbURI = "mongodb+srv://usman1057:SubZeRO1057@testcluster.rybguaj.mongodb.net/node-cc?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3005)
    })
    .catch((err) => console.log("Error: ", err));

//register view engine
app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: "All Blogs", blogs: result });
        })
        .catch((err) => {
            console.log('err: ', err);
        });
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});