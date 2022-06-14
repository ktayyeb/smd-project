const express = require('express');
const router =express.Router();
const Assessment=require('../models/Assessment')
const GPA=require('../models/GPA')
const FinalGrades=require('../models/finalGrades')
const Weights=require('../models/weights')

//posts a grade of a student in a specific assessment
router.post('/assessment',async(req,res)=>{


  const courseInfo = await Weights.findOne({sid:req.body.sid,cid:req.body.cid});

  const Type = req.body.type;

  const assessmentInfo = Type===0?courseInfo.assignments:Type===1?courseInfo.quizzes:Type===2?courseInfo.midterms:Type===3?courseInfo.projects:courseInfo.final;
  console.log(courseInfo);
  console.log(assessmentInfo);
  //console.log(assessmentInfo);
  //console.log(course);

  
  await Assessment.create({
    sid:req.body.sid,
    cid:req.body.cid,
    title:courseInfo.title,
    type:Type,
    weight:assessmentInfo.weight,
    num:(assessmentInfo.completed+1),
    grade:req.body.grade,
    totalGrade:req.body.totalGrade,
    best:assessmentInfo.best,
    totalNum:assessmentInfo.num
    
  }).then((a)=> {res.send(a)}).catch((e)=>{res.send(e)});

  const update= await updateWeight(req.body.sid,req.body.cid,Type,assessmentInfo);
  console.log(update);


  //Assessment.create(req.body).then((a)=> {res.send(a)}).catch((e)=>{console.log(e);});
  
});

async function updateWeight(Sid,Cid,Type,assessment){
  const Results=await getBest(Sid,Cid, 0,assessment.best);
  console.log(Results);
  if(Type===0){
  console.log("i'm here")  
  Weights.updateOne({sid:Sid,cid:Cid},{assignments:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

if(Type===1){
  Weights.updateOne({sid:Sid,cid:Cid},{quizzes:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else if(Type===2){
  Weights.updateOne({sid:Sid,cid:Cid},{midterms:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else if(Type===3){
  Weights.updateOne({sid:Sid,cid:Cid},{projects:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else if(Type===4){
  Weights.updateOne({sid:Sid,cid:Cid},{final:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else{
  return null;
}

}

//posts a new course
router.post('/newCourse',(req,res)=>{
  Weights.create(req.body).then((a)=> {res.send(a);} ).catch((e)=>{res.send(e)});
  
});

router.get('/allCourses/:sid',(req,res)=>{
  Weights.find({sid:req.params.sid},{title:1,cid:1}).sort({title:-1}).then((courses)=> {res.send(courses);} ).catch((e)=>{res.send(e)});

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
async function getBest(Sid,Cid, Type,Best) {
  // let Best = await Weights.findOne({ sid:Sid, cid: Cid, type: Type })
  // if(Best==null){return null;}
  // Best=Best.best
  console.log(Sid);
  console.log(Cid);
  console.log(Type);
  console.log(Best);

  let arr =  await Assessment.find({ sid:Sid, cid: Cid, type: Type })
                            .sort({grade:-1})
                            .limit(Best);

  let score = 0;
  let total = 0;


  const len=arr.length
  let ratio=0
  console.log(arr)
  
  if (len>=arr[0].best){
    ratio=1
  }
  else{
    ratio=len/arr[0].best
  }

  console.log(ratio)


  let result = arr.reduce((prev, x) => {
    score += x.grade;
    total += x.totalGrade;

    return (score / total) * x.weight*(ratio);
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
