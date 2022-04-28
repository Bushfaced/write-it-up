const Post = require('../models/post');


module.exports = {
  new: newPost,
  create,
  index,
  forUser,
  delete: deletePost,
  show,
  edit,
};

function newPost(req, res) {
  res.render('posts/new')
};

function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  Post.create(req.body, function (err, post) {
    res.redirect('/posts')
  });
};

function forUser(req, res) {
  Post.find({ user: req.user._id }, function (err, posts) {
    res.render('posts/index', { posts, title: 'My Posts' });
  });
};

function index(req, res) {
  Post.find({}, function (err, posts) {
      res.render('posts/index', { posts, title: 'All Posts' });
    });
  };
  
function show(req, res) {
  console.log("hello from show");
  //console.log(req);
  console.log(req.params.id);
  Post.find({ _id: req.params.id }, function(err, foundPost) {
    console.log(foundPost);
    res.render('posts/edit', { foundPost, title: foundPost.title });
  });
};

function deletePost(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  Post.find({ user: req.user._id }, function (err, posts) {
    Post.deleteOne(req.body, function (err, post) {
      res.redirect('/posts/user');
    });
  });
}; 

function edit(req, res) {
  console.log("In edit");
  console.log(req);
};
