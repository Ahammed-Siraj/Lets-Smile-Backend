const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  className: { type: String, required: true },
  school: { type: String, required: true },
  number: { type: String, required: true },
  sector: { type: String, required: true },
  fatherName: { type: String, required: true },
  age: { type: Number, required: true },
  unit: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Registration", RegistrationSchema);

