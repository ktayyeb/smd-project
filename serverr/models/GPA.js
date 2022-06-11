const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpaSchema = new Schema({

    sid:{type:Number},
    
    //cumulative
    gpa:{ type:Number },

    //semester gpa
    current:{ type:Number }


});


module.exports=mongoose.model("GPA",gpaSchema);