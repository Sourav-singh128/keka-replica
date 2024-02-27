const mongoose = require("mongoose");
const kekaUser = require("./user");
const posts = new mongoose.Schema({
  comment: String,
  postUrl: String,
  createdOn: Date,
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: kekaUser,
  },
});

const kekapost = mongoose.model("posts", posts);
module.exports = kekapost;
