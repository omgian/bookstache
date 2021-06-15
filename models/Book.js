const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  author:{
    type: String,
    require: true,
  },
  isbn10:{
    type: Number,
    require: true, 
  },
  isbn13:{
    type: Number,
    require: true, 
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  favorite: {
    type:Boolean,
    required:false,
  }
});

module.exports = mongoose.model("Book", PostSchema);
