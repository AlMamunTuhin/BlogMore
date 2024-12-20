import Blog from "../models/blog.js";
import User from "../models/user.js";


const allBlogs = async (req, res) => {
   try {
      const id = req.user._id;
      const blogs = await Blog.find({ createdBy: id });
      const user = await User.findById(id);
      res.render('home', { blogs, user });
   } catch (error) {
      console.error('Error retrieving blogs:', error);
      res.status(500).send('Error retrieving blogs');
   }
}

const renderNew = (req, res) => {
   res.render('new');
}

const oneBlog = async (req, res) => {
   const blogId = req.params.id;
   try {
      const blog = await Blog.findOne({ _id: blogId });
      const user = await User.findOne({ _id: blog.createdBy });
      const u = req.user;
      res.render('blog', { blog, user, u });
   } catch (error) {
      console.error('Error retrieving blog:', error);
      res.status(500).send('Error retrieving blogs');
   }
}

const editBlog = async (req, res) => {
   const blogId = req.params.id;
   try {
      const blog = await Blog.findOne({ _id: blogId });
      res.render('edit', { blog });
   } catch (error) {
      console.error('Error retrieving blog for edit:', error);
      res.status(500).send('Error retrieving blog for edit');
   }
}

const createNewBlog = async (req, res) => {
   try {
      const { title, content } = req.body;
      const newBlog = new Blog({
      title: title,
      content: content,
      createdBy: req.user._id
      });
      await Blog.create(newBlog);
      res.redirect('/blogs');
   } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).send('Error creating blog');
   }
}


const updateBlog = async (req, res) => {
   const blogId = req.params.id;
   const { title, content } = req.body;
   try {
      const blog = await Blog.findOne({ _id: blogId });
      blog.title = title;
      blog.content = content;
      await blog.save();
      res.redirect(`/blogs/${blogId}`);
   } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).send('Error updating blog');
   }
}

const deleteBlog = async (req, res) => {
   const id = req.params.id;
   try {
      await Blog.findByIdAndDelete(id);
      res.redirect('/blogs');
   } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).send('Error deleting blog');
   }
};
   

export const con =  {
   allBlogs,
   renderNew,
   oneBlog,
   editBlog,
   createNewBlog,
   updateBlog,
   deleteBlog
}
