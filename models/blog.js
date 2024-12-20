import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: String,
    content: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    },
    date: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
