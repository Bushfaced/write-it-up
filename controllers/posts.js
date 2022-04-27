const Post = require('../models/post');


module.exports = {
  new: newPost,
  create,
  index,
  forUser,
  delete: deletePost,
  show,
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
