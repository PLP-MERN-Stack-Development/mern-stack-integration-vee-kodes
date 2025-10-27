const { validationResult } = require('express-validator');
const slugify = require('slugify');
const Post = require('../models/Post');
const Category = require('../models/Category');

exports.getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const category = req.query.category;
    const q = req.query.q;

    const filter = {};
    if (category) filter.category = category;
    if (q) filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } },
      { tags: { $regex: q, $options: 'i' } }
    ];

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({ data: posts, meta: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    const query = /^[0-9a-fA-F]{24}$/.test(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };

    const post = await Post.findOne(query)
      .populate('author', 'name email')
      .populate('category', 'name slug');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // increment view count (async)
    post.viewCount = (post.viewCount || 0) + 1;
    post.save().catch(() => {});

    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, content, excerpt, category, tags, featuredImage, isPublished } = req.body;

    const cat = await Category.findById(category);
    if (!cat) return res.status(400).json({ message: 'Invalid category' });

    const slug = slugify(title, { lower: true, strict: true });
    const exists = await Post.findOne({ slug });
    const finalSlug = exists ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const post = new Post({
      title,
      content,
      excerpt,
      featuredImage: featuredImage || null,
      slug: finalSlug,
      author: req.user.id,
      category,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      isPublished: !!isPublished
    });

    await post.save();
    const fullPost = await Post.findById(post._id).populate('author', 'name email').populate('category', 'name slug');
    res.status(201).json({success: true, data: fullPost});
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });

    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { title, content, excerpt, category, tags, featuredImage, isPublished } = req.body;

    if (title && title !== post.title) {
      const s = slugify(title, { lower: true, strict: true });
      post.slug = s;
      post.title = title;
    }
    if (content) post.content = content;
    if (excerpt) post.excerpt = excerpt;
    if (typeof isPublished !== 'undefined') post.isPublished = !!isPublished;
    if (category) {
      const cat = await Category.findById(category);
      if (!cat) return res.status(400).json({ message: 'Invalid category' });
      post.category = category;
    }
    if (typeof featuredImage !== 'undefined') post.featuredImage = featuredImage;
    if (tags) post.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());

    await post.save();
    const updatedPost = await Post.findById(post._id).populate('author', 'name email').populate('category', 'name slug');
    res.json({success: true, data: updatedPost});
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });

    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });

    const postId = req.params.id;
    const { content } = req.body;
    if (!content || !content.trim()) return res.status(400).json({ message: 'Comment required' });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = { user: req.user.id, content };
    post.comments.push(comment);
    await post.save();

    const lastComment = post.comments[post.comments.length - 1];
    res.status(201).json(lastComment);
  } catch (err) {
    next(err);
  }
};
