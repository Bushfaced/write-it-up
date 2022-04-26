var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts');
// be able to create a post
// get /posts/new
router.get('/new', postsCtrl.new);
router.post('/', postsCtrl.create);

module.exports = router;