const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

const multer = require('multer');

//Image upload Api Part
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//Create a post
router.post('/newpost', upload.single('file'), async (req, res) => {
  const newPost = new Post({
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
    photo: req.file.path,
  });
  try {
    const createdPost = await newPost.save();
    res.status(200).json(createdPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

//Get Top Post
router.get('/topposts', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: 'asc' }).limit(5);
    !posts && res.status(404).json('Post Not found');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update post
router.put('/:id', upload.single('file'), async (req, res) => {
  // try {
  //   let fPath;
  //   try {
  //     fPath = req.file.path;
  //   } catch (err) {
  //     fPath = req.body.file;
  //   }

  const post = await Post.findById(req.params.id);
  if (post.username === req.body.username) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            title: req.body.title,
            description: req.body.description,
            photo: req.file ? req.file.path : post.photo,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  } else {
    res.status(401).json('Unauthorized Access');
  }
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

//Get Post details
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json('Post Not found');
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json('Post Not found');
    if (post) {
      console.log(req.body);
      if (post.username === req.body.username) {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json('Post has been deleted');
      } else {
        res.status(401).json('Unauthorized Access');
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All post

// //Get Post details
router.get('/', async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const searchType = req.query.searchType;
  const keyword = req.query.keyword;

  try {
    let posts;

    if (searchType === 'title') {
      posts = await Post.find({ title: { $regex: keyword, $options: 'i' } });
    } else if (searchType === 'description') {
      posts = await Post.find({
        description: { $regex: keyword, $options: 'i' },
      });
    } else if (searchType === 'author') {
      posts = await Post.find({ username: { $regex: keyword, $options: 'i' } });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else if (username) {
      posts = await Post.find({ username });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
