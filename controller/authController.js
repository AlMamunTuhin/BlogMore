import User from "../models/user.js";
import passport from 'passport';
import bcrypt from 'bcrypt';

const a = (req, res) => {
   res.render('start');
};

const b = (req, res) => {
   res.render('login');
 };

const c = (req, res) => {
   res.render('signup');
}

const d = passport.authenticate('local', {
     successRedirect: '/blogs',
     failureRedirect: '/login',
     failureFlash: true
})

const e = (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect('/login');
    });
  });
};


const f = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.log(error.message);
    res.redirect('/signup');
  }
};

 

export const con = { a, b, c, d, e, f };
