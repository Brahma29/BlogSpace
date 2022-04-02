const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

//registering a user

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    try {
      const { username, name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        name,
        email,
        password: hashedPass,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

//Logging in a user

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (validated) {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  })
);

module.exports = router;
