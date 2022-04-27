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
  // Note the cool "dot" syntax to query on the property of a subdoc
  Post.findOne({'post._id': req.params.id, 'post.user': req.user._id}).then(function(post) {
    // Rogue user!
    if (!post) return res.redirect('/posts');
    // Remove the review using the remove method available on Mongoose arrays
    post.remove(req.params.id);
    // Save the updated movie
    post.save().then(function() {
      // Redirect back to the movie's show view
      res.redirect(`/posts/${post._id}`);
    }).catch(function(err) {
      // Let Express display an error
      return next(err);
    });
  });
}
