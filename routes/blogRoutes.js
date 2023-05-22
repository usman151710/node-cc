const express = require('express');
const Blog = require("../models/blogs");
const { getBlogs, getBlogByID, postBlog, deleteBlogByID, getCreateBlog } = require('../controllers/blogController');

const router = express.Router();

router.get('/', getBlogs);

router.post('/', postBlog);

router.get('/create', getCreateBlog);

router.get('/:id', getBlogByID);

router.delete('/:id', deleteBlogByID);

module.exports = router;