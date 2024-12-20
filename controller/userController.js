import Blog from "../models/blog.js";
import User from "../models/user.js";

const userHome = async (req, res) => {
   try {
      const id = req.params.id;
      if (id === req.user._id.toString()) {
      res.redirect('/blogs');
      }
      const user = await User.findOne({ _id: id });
      const blogs = await Blog.find({ createdBy: id });
      res.render('user', { blogs, user });
   } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).send('Error retrieving user');
   }
};

export const con = {
   userHome
}
