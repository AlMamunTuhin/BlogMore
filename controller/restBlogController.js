import Blog from "../models/blog.js";
import User from "../models/user.js";

const a = async (req, res) => {
   try {
      const id = req.user._id;
      const blogs = await Blog.find({ createdBy: { $ne: id } });
      const user = req.user;
      res.render('blogs', { blogs, user });
   } catch (error) {
      console.error('Error retrieving note:', error);
      res.status(500).send('Error retrieving notes');
   }
};

const b = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findOne({ _id: blogId });
    const user = await User.findOne({ _id: blog.createdBy });
    const u = req.user;

    res.render('blog', { blog, user, u });
  } catch (error) {
    console.error('Error retrieving note:', error);
    res.status(500).send('Error retrieving notes');
  }
};


export const con = {
   a,
   b
}
