const mongoose = require("mongoose");
const approachSchema = new mongoose.Schema({
  problem: { type: String, required: true },
  name: { type: String, required: true },
  email: String,
  explanation: { type: String, required: true },
  pseudocode: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Approach",approachSchema);