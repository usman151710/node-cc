const Blog = require('../models/blogs');

const getBlogs = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: "All Blogs", blogs: result });
        })
        .catch((err) => {
            console.log('err: ', err);
        });
}

const getBlogByID = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: "Blog Details" })
        })
        .catch((err) => {
            console.log('err: ', err);
            res.status(404).render('404', { title: "Blog Not Found" });
        });
}

const getCreateBlog = (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
}

const postBlog = (req, res) => {
    const blog = Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log('err: ', err);
        });
}

const deleteBlogByID = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log('err: ', err);
        });
}

module.exports = {
    getBlogs,
    getBlogByID,
    getCreateBlog,
    postBlog,
    deleteBlogByID
}