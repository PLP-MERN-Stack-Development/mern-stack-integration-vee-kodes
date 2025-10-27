const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const auth = require('../middleware/auth');

router.get('/', categoriesController.getAll);

router.post('/',
  auth.requiredAuth,
  [ body('name').notEmpty().withMessage('Name required') ],
  categoriesController.create
);

module.exports = router;
