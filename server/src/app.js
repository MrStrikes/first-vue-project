const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Post = require("../models/post");

mongoose.connect('mongodb://localhost:27017/Blog');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded to Database");
});

const port = process.env.PORT || 8081;
const app = express();
app.use(morgan());
app.use(bodyParser.json());
app.use(cors());

app.post('/posts', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var new_post = new Post({
        title: title,
        description: description
    });
  
    new_post.save(function (error) {
        if (error) {
            console.log(error);
        }
        res.json({
            success: true,
            message: 'Post saved successfully!'
        });
    });
});

app.get('/posts', (req, res) => {
    Post.find({}, 'title description', function (error, posts) {
        if (error) { console.error(error); }
        res.json({
            posts: posts
        });
    }).sort({_id:-1});
});

app.get('/post/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }
        res.send(post);
    });
});


app.put('/posts/:id', (req, res) => {
Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }
        post.title = req.body.title;
        post.description = req.body.description;
        post.save(function (error) {
            if (error) {
                console.log(error);
            }
            res.json({
                success: true
            });
        });
    });
});

app.delete('/posts/:id', (req, res) => {
    Post.remove({
        _id: req.params.id
    }, function(err, post){
        if (err) res.send(err);
        res.send({
            success: true
        });
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
