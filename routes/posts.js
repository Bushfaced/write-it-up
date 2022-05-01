var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts');
const isLoggedIn = require('../config/auth')

//posts
router.get('/new', postsCtrl.new);
router.post('/', isLoggedIn, postsCtrl.create);
router.get('/', postsCtrl.index);
router.get('/user', postsCtrl.forUser);
router.delete('/:id', isLoggedIn, postsCtrl.delete);
router.get('/:id', postsCtrl.show);
router.get('/:id/edit', isLoggedIn, postsCtrl.edit);
router.put('/:id', isLoggedIn, postsCtrl.update);



module.exports = router;