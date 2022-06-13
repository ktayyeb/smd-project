const express = require('express');
const router =express.Router();
const Assessment=require('../models/Assessment')
const GPA=require('../models/GPA')
const FinalGrades=require('../models/finalGrades')
const Weights=require('../models/weights')

//posts a grade of a student in a specific assessment
router.post('/assessment',(req,res)=>{
  Assessment.create(req.body).then((a)=> {res.send(a)}).catch((e)=>{console.log(e);});
  
});

//posts a new course
router.post('/newCourse',(req,res)=>{
  Weights.create(req.body).then((a)=> {res.send(a);} ).catch((e)=>{res.send(e)});
  
});







//posts the neumerical final grade the student gets in a course
router.post('/finalGrades',async(req,res)=>{

  const Sid = req.body.sid
  const Cid = req.body.cid

  const assignments=await getBest(Sid,Cid, 0);
  if(assignments==null){res.send({message:"assignments not completed"})}

  const quizzes=await getBest(Sid,Cid, 1);
  if(quizzes==null){return res.send({message:"quizzes not completed"})}

  const midterm=await getBest(Sid,Cid, 2);
  if(midterm==null){return res.send({message:"midterm not completed"})}
  
  const projects=await getBest(Sid,Cid, 3);
  if(projects==null){return res.send({message:"projects not completed"})}

  const final=await getBest(Sid,Cid, 4);
  if(final==null){return res.send({message:"final not completed"})}

  const Result= assignments+quizzes+midterm+projects+final;
  console.log(Result);


  FinalGrades.create({
    sid:Sid,
    cid:Cid,
    hours:req.body.hours,
    result:Result
  }).then((a)=> {res.send(a)}).catch((e)=>{console.log(e);});
  
});

router.get('/expectations',async(req,res)=>{

  const Sid = req.body.sid
  const Cid = req.body.cid

  const assignments=await getBest(Sid,Cid, 0);
  if(assignments==null){assignments=0}

  const quizzes=await getBest(Sid,Cid, 1);
  if(quizzes==null){quizzes=0}

  const midterm=await getBest(Sid,Cid, 2);
  if(midterm==null){midterm=0}
  
  const projects=await getBest(Sid,Cid, 3);
  if(projects==null){projects=0}

  const final=await getBest(Sid,Cid, 4);
  if(final==null){final=0}

  const Result= assignments+quizzes+midterm+projects+final;
  console.log(Result);


  
});

//calculate the best percentage a student can get out of an assessment(quizzes,assignments,etc)
async function getBest(Sid,Cid, Type) {
  let Best = await Assessment.findOne({ sid:Sid, cid: Cid, type: Type })
  if(Best==null){return null;}
  Best=Best.best
  let arr =  await Assessment.find({ sid:Sid, cid: Cid, type: Type })
                            .sort({grade:-1})
                            .limit(Best);

  let score = 0;
  let total = 0;
  let result = arr.reduce((prev, x) => {
    score += x.grade;
    total += x.totalGrade;
    return (score / total) * x.weight;
  }, 0);

  let str= Type==0?"Assignments:":Type==1?"Quizzes:":Type==2?"midterm:":Type==3?"project:":"final:";
  console.log(str + result.toString() + "%");

  return result;
}

//endpoint to get the best percentage a student can get out of an assessment(quizzes,assignments,etc)
router.get('/bests/:sid/:cid/:type',async(req,res)=>{
  
  const result = await getBest(req.params.sid,req.params.cid,req.params.type);
  res.send({"Assignments":result})
  
  

});



module.exports=router
