const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');
 

// list + filters + pagination
router.get('/', postsController.getAll);

// get single by id or slug
router.get('/:id', postsController.getOne);

// create
router.post('/', auth.requiredAuth,
  [
    body('title').notEmpty().withMessage('Title required'),
    body('content').notEmpty().withMessage('Content required'),
    body('category').notEmpty().withMessage('Category required')
  ],
  postsController.create
);

// update
router.put('/:id', auth.requiredAuth, postsController.update);

// delete
router.delete('/:id', auth.requiredAuth, postsController.remove);

// comments
router.post('/:id/comments', auth.requiredAuth, postsController.addComment);

module.exports = router;


