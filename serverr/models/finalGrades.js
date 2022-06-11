const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//final grade of a course
const finalSchema = new Schema({

    sid:{type:Number},

    cid:{type:Number},

    hours:{type:Number},

    result:{type:Number}


});


module.exports=mongoose.model("FinalGrades",finalSchema);