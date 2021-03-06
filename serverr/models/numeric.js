const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const numericSchema = new Schema({
  result:{type:String,required:true},
  numeric:{type:Number,required:true},
  percent:{type:Number,required:true}
});

module.exports = mongoose.model("Numeric", numericSchema);
