const Post = require('../models/post');


module.exports = {
  new: newPost,
  create,
  index,
  forUser,
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
}

function forUser(req, res) {
  Post.find({user: req.user._id}, function(err, posts) {
    res.render('posts/index', { posts, title: 'My Posts' });
  });
}

function index(req, res) {
  Post.find({}, function(err, posts) {
    res.render('posts/index', { posts, title: 'All Posts' });
  });
}

function deletePost(req, res, next) {
  Post.findOne({'post.id': req.params.id, 'post.user': req.user._id}).then(function(post) {
    if (!post) return res.redirect('/posts');
    post.remove(req.params._id);
    post.save().then(function() {
      res.redirect(`/posts/${post._id}`);
    }).catch(function(err) {
      return next(err);
    });
    res.redirect(`/posts/user`);
  });
}
