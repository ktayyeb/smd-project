const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gpaSchema = new Schema({
  sid: { type: Number },

  //semester gpa
  gpa: { type: Number },

  gpaLetter: {type:String}



  //semester gpa
  //current: { type: Number },
});

module.exports = mongoose.model("GPA", gpaSchema);
