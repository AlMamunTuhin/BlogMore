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
  req.logout((err) => { // Passport's logout method
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }

    req.session.destroy((err) => { // Destroy the session in the store
      if (err) {
        return res.status(500).json({ message: 'Session destruction failed', error: err });
      }

      res.clearCookie('connect.sid'); // Clear the session cookie
      return res.status(200).json({ message: 'Logged out successfully' });
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
