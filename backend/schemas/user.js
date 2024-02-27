const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const kekaUser = mongoose.model("user", userSchema);

module.exports = kekaUser;
