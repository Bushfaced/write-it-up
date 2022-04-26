const Post = require('../models/post');


module.exports = {
  new: newPost,
  create,
  delete: deletePost,
}

function newPost(req, res) {
  res.render('posts/new')
}

function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar =  req.user.avatar;
  Post.create(req.body, function(err, post) {
    res.redirect('/posts')
  });
  Post.post.push(req.body);
  Post.save(function(err) {
    res.redirect(`/posts/${req.params._id}`);
  });
}

function deletePost(req, res) {

}