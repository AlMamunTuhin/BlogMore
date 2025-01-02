// Libraries
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import helmet from 'helmet';
import initializePassport from './config/passport-config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { ensureAuthenticated } from './middleware/chechAuthenticity.js';
import methodOverride from 'method-override';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();


// Route imports
import authRoutes from './route/authRoute.js';
import blogRoutes from './route/blogRoute.js';
import userRoutes from './route/userRoute.js';
import restBlogRoutes from './route/restBlogRoute.js';


// App creation
const app = express();

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'strict'
  }
}

// Middleware setup
app.use(helmet());
app.set("view engine", "ejs");
app.use(morgan('tiny'));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'));
app.use(session(sessionOptions));
initializePassport(passport); 
app.use(passport.initialize());
app.use(passport.session());


// Route setup
app.use('/', authRoutes);
app.use('/blogs', ensureAuthenticated, blogRoutes);
app.use('/user', ensureAuthenticated, userRoutes);
app.use('/restblogs', ensureAuthenticated, restBlogRoutes);

connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

export default app;




  






































































































































































// app.get('/search', ensureAuthenticated, async (req, res) => {
//   const searchTerm = req.query.term;
//   try {
//     const blogs = await Blog.find({
//       $or: [
//         { title: { $regex: searchTerm, $options: 'i' } },
//         { content: { $regex: searchTerm, $options: 'i' } }
//       ],
//       createdBy: req.user._id
//     });
//     const user = await User.findById(req.user._id);
//     res.render('index', { blogs, user });
//   } catch (error) {
//     console.error('Error searching notes:', error);
//     res.status(500).send('Error searching blogs');
//   }
// });
