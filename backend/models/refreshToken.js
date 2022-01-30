const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema({
  refresh_token: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now(),
    index: {
      expires: "86400s",
    },
  },
});

const token = mongoose.model("refreshToken", refreshTokenSchema);
module.exports = token;
