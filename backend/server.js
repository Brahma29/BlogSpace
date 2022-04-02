const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const cors = require('cors');
const errorHandler = require('./middleWares/errorHandler');
dotenv.config({ path: './config/config.env' });
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log('Connected To DB'))
  .catch((err) => console.log(err));
/*
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.status(200).json('File uploaded Successfully');
});*/
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Backend is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
