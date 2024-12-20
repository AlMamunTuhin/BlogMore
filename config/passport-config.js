import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user.js';


function initialize() {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }
      const isMatch = bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user._id);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((userId, done) => done(null, userId)); 
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
}

export default initialize;
