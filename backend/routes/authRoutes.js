const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: '/login',
}), (req, res) => {
  // Successful login
  const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.redirect(`yourapp://login-success?token=${token}`); // for React Native deep linking
});

module.exports = router;