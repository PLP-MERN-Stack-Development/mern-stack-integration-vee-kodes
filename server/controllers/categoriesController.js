const { validationResult } = require('express-validator');
const slugify = require('slugify');
const Category = require('../models/Category');

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, description } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const existing = await Category.findOne({ slug });
    if (existing) return res.status(409).json({ message: 'Category exists' });

    const category = new Category({ name, description, slug });
    await category.save();
    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
};
