const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide valid post title"],
      unique: [true, "Post title already exists"],
    },
    description: {
      type: String,
      required: [true,"Please provide valid post description"],
      maxlength: [500, "Post Description cannot be more than 500 chars"],
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories:{
        type:Array,
        required:false,
    }
  },
  {
    timestamps: true,
  }
);


module.exports=mongoose.model('Post',PostSchema);