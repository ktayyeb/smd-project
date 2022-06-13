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
        num:{type:Number,required:true},
        weight:{type:Number,required:true},
        best:{type:Number,required:true},
        completed:{type:Number,default:0},
        results:{type:Number,default:0},
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