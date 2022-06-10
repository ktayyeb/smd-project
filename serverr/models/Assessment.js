const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assessmentSchema = new Schema({
    cid:{
        type:Number,
        required:true
    },

    title:{
        type:String,
        required:true
    },

    type:{ /*   
                0: assignment
                1: quiz
                2:midterm
                3:project
                4:final

            */
        type:Number,
        required:true
    },

    weight:{
        type:Number,
        required:true
    },

    num:{
        type:Number,
        required:true
    },

    grade:{
        type:Number,
        required:true
    },

    totalGrade:{
        type:Number,
        required:true
    },

    best:{
        type:Number,
        required:true
    },

    totalNum:{
        type:Number,
        required:true
    },

});


module.exports=mongoose.model("Assessment",assessmentSchema);