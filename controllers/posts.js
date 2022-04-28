const Post = require('../models/post');


module.exports = {
  new: newPost,
  create,
  index,
  forUser,
  delete: deletePost,
  // show,
  edit,
  update,
};

function update(req, res) {
  console.log(req.body);
  Post.findOneAndUpdate({ _id: req.params.id, user: req.user._id}, req.body, {new: true}, function(err, updatedPost) {
    console.log(updatedPost);
    if (err || !updatedPost) return res.redirect('/posts');
    res.redirect(`/posts`)
  })
};

function edit(req, res) {
  Post.findById(req.params.id, function(err, foundPost) {
    res.render('posts/edit', { foundPost, title: foundPost.title });
  });
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
    res.render('posts/index', { posts, title: 'All Posts' })
  })
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





// function show(req, res) {
//   //   
// };