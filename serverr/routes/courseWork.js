const express = require('express');
const router =express.Router();
const Assessment=require('../models/Assessment')

router.post('/assessment',(req,res)=>{
    Assessment.create(req.body).then((a)=> {res.send(a)}).catch((e)=>{console.log(e);});
    
  });

router.get('/bests/:cid/:type/:best',(req,res)=>{

  Assessment.find({cid:req.params.cid,type:req.params.type})
            .sort({grade:-1})
            .limit(2)
            .then( (arr)=>{
              
              let score=0
              let total=0
              let result = arr.reduce((prev,x, i)=>{
                score+=x.grade;
                total+=x.totalGrade;
                return score/total*x.weight;
              },0);

              console.log("Assignments:"+result.toString()+"%");

              res.send({"Assignments":result})

            } 
              
              );
  


}); 

module.exports=router
