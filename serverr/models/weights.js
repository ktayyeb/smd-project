const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//model of weights 
const weightsSchema = new Schema({

    sid:{
        type:Number,
        required:true
    },

    cid:{
        type:Number,
        required:true
    },

    title:{
        type:String,
        required:true
    },



    hours:{
        type:Number,
        required:true
    },

    assignments:{
        num:{type:Number,required:true},    //how many assignments the student will take.
        weight:{type:Number,required:true}, //the weight of the assignments.
        best:{type:Number,required:true},   //how many assignments will be counted.
        completed:{type:Number,default:0},  //how many assignments the user provided at this point.
        results:{type:Number,default:0},    //the performance of the user in the assignments at this point.
    },

    quizzes:{
        num:{type:Number,required:true},
        weight:{type:Number,required:true},
        best:{type:Number,required:true},
        completed:{type:Number,default:0},
        results:{type:Number,default:0},
    },

    midterms:{
        num:{type:Number,required:true},
        weight:{type:Number,required:true},
        best:{type:Number,required:true},
        completed:{type:Number,default:0},
        results:{type:Number,default:0},
    },

    projects:{
        num:{type:Number,required:true},
        weight:{type:Number,required:true},
        best:{type:Number,required:true},
        completed:{type:Number,default:0},
        results:{type:Number,default:0},
    },

    final:{
        num:{type:Number,required:true},
        weight:{type:Number,required:true},
        best:{type:Number,required:true},
        completed:{type:Number,default:0},
        results:{type:Number,default:0},
    },

});


module.exports=mongoose.model("Weights",weightsSchema);