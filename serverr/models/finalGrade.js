const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//final grade of a course
const finalSchema = new Schema({

    sid:{type:Number},

    cid:{type:Number},

    hours:{type:Number},

    title:{type:String},

    result:{type:String},

    numeric:{type:Number},

    points:{type:Number}

    




});


module.exports=mongoose.model("FinalGrade",finalSchema);