const Post = require('../models/post');


module.exports = {
  new: newPost,
  create,
}

function newPost(req, res) {
  res.render('posts/new')
}

function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar =  req.user.avatar;
//index to posts
  Post.create(req.body, function(err, post) {
    res.redirect('/posts')
  });
}