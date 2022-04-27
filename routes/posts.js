var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts');

// be able to create a post
// GET /posts/new
router.get('/new', postsCtrl.new);
router.post('/', postsCtrl.create);
//GET /posts
router.get('/', postsCtrl.index);
//GET /posts/user
router.get('/user', postsCtrl.forUser);
//GET /posts/:id
// router.get('/:id', postsCtrl.show);
//DELETE /posts/:id
router.delete('/:id', postsCtrl.delete);
//PUT /posts/:id .update
// router.put('/:id', postsCtrl.update);

module.exports = router;