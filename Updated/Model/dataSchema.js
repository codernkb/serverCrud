const mongoose = require('mongoose');
///////define schema///////////////
const dataSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  mobile: { type: Number, require: true },
  age: { type: Number, require: true },
  hobbies: { type: [], require: true },
  graduation: { type: Boolean, require: true },
  address: { type: String, require: true },
  state: { type: String, require: true },
  pincode: { type: Number, require: true },
  isDeleted: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

////////create model////////////
const Data = mongoose.model("Data", dataSchema)
module.exports = Data