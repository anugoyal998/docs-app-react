const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  gid: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
