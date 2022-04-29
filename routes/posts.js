var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/new', postsCtrl.new);
router.post('/', postsCtrl.create);
router.get('/', postsCtrl.index);
router.get('/user', postsCtrl.forUser);
router.delete('/:id', postsCtrl.delete);
router.get('/:id', postsCtrl.show);
router.get('/:id/edit', postsCtrl.edit);
router.put('/:id', postsCtrl.update);

module.exports = router;