var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogMyWay');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

var PostSchema;
PostSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: String,
    Date: {type: Date, default: Date.now()}});

var PostModel = mongoose.model("PostModel", PostSchema);

app.listen(1790);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/location/blogpost", getAllPosts);
app.get("/location/blogpost", getPostById);
app.post("/location/blogpost/ :id", createPost);
app.delete('/location/blogpost/:id', deletePost);
app.put("/location/blogpost/:id", updatePost);

function updatePost(req, res){
    var postId = req.params.id;
    var newPost = req.body;

    PostModel
        .update({_id: postId}, {
           title:post.title,
           body:post.body
        })
        .then(
            function(status){
                res.send("Sucess")
            }
        )

}

function deletePost(req, res){
    var postId = req.params.id;
    PostModel
        .remove({_id: postId})
        .then(
        function (status) {
            res.send("sucess")
        }
    )

}

function getPostById(req, res) {
    var postId = req.params.id;
    PostModel
        .findById(postId)
        .then(
            function(post) {
                res.json(post);
            }
        );
}

function getAllPosts(req, res){
    PostModel
        .find()
        .then(
            function (posts) {
                res.json(posts);
            }
        )
}

function createPost(req, res){
    var post = req.body;
    console.log(post);
    PostModel
        .create(post)
        .then(
            function (postObj) {
                res.json(postObj);
            }
        )
}