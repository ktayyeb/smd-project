const express = require('express');
const router =express.Router();
const Assessment=require('../models/Assessment')
const GPA=require('../models/gpa')
const FinalGrade=require('../models/finalGrade')
const Weights=require('../models/weights')
const Numeric=require('../models/numeric')


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
  
  if (len>=Best){
    ratio=1
  }
  else{
    ratio=len/Best
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

//posts a grade of a student in a specific assessment
router.post('/assessment',async(req,res)=>{


  const courseInfo = await Weights.findOne({sid:req.body.sid,cid:req.body.cid});

  const Type = req.body.type;

  const assessmentInfo = Type===0?courseInfo.assignments:Type===1?courseInfo.quizzes:Type===2?courseInfo.midterms:Type===3?courseInfo.projects:courseInfo.final;
  console.log(courseInfo);
  console.log(assessmentInfo);

  //console.log(assessmentInfo);
  //console.log(course);

  console.log(assessmentInfo.completed)
  console.log(assessmentInfo.completed)
  
  
  if(assessmentInfo.completed>=assessmentInfo.num){
    res.send({message:"You inserted all of your assessments here!"});
    
  }

  else{
    console.log('here');
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
    
  }).then((a)=> {res.send(a);}).catch((e)=>{res.send(e)});

  const update= await updateWeight(req.body.sid,req.body.cid,Type,assessmentInfo);
  console.log('update',update);

  //Assessment.create(req.body).then((a)=> {res.send(a)}).catch((e)=>{console.log(e);});
  }

});


async function updateWeight(Sid,Cid,Type,assessment){
  const Results=await getBest(Sid,Cid, Type,assessment.best);
  //console.log(Results);
  if(Type===0){
  //console.log("i'm here")  
  Weights.updateOne({sid:Sid,cid:Cid},{assignments:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else if(Type===1){
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
router.post('/newCourse',async(req,res)=>{
  const courseInfo1 = await Weights.findOne({sid:req.body.sid,cid:req.body.cid});
  const courseInfo2 = await Weights.findOne({sid:req.body.sid,title:req.body.title});


  if(courseInfo1!=null||courseInfo2!=null){
    res.send({message:"this course has been added before"});
    //return;
  }


else{
  await Weights.create(req.body).then((a)=> {res.send(a);} ).catch((e)=>{res.send(e)});
}
});

router.get('/allCourses/:sid',(req,res)=>{
  Weights.find({sid:req.params.sid},{title:1,cid:1}).sort({title:-1}).then((courses)=> {res.send(courses);} ).catch((e)=>{res.send(e)});

});

router.post('/numerics',(req,res)=>{
  Numeric.create(req.body).then((a)=> {res.send(a);} ).catch((e)=>{res.send(e)});
});


router.post('/finalGrade',async (req,res)=>{
  
  let numericScore = await Numeric.findOne({result:req.body.result});
  const finalGrade= await FinalGrade.findOne({sid:req.body.sid,cid:req.body.cid});

  const courseInfo = await Weights.findOne({sid:req.body.sid,cid:req.body.cid});
  //if(courseInfo.assignments.complted>=)

  if(courseInfo.assignments.completed<courseInfo.assignments.num || 
    courseInfo.quizzes.completed<courseInfo.quizzes.num ||
    courseInfo.midterms.completed<courseInfo.midterms.num ||
    courseInfo.projects.completed<courseInfo.projects.num
    ){
    res.send({message:"Please complete filling your course work"});
    
  }

  else{

  if(finalGrade!=null){res.send({message:"this course has been added before"});}
  //console.log('numeric',numericScore);
  else{
  numericScore=numericScore.numeric
  //console.log('numeric',numericScore);

  let course= await Weights.findOne({sid:req.body.sid,cid:req.body.cid})
  //console.log('weight',hrs);
  let hrs=course.hours

  let Title=course.title
  //console.log('hrs',hrs);

  //console.log('numericScore:',numericScore);
  //console.log('hours:',hrs);


  FinalGrade.create({
    sid:req.body.sid,

    cid:req.body.cid,

    hours:hrs,

    title:Title,

    result:req.body.result,

    numeric:numericScore
    
  }).then((a)=> {res.send(a)}).catch((e)=>{res.send(e)});


  let finalExamGrade=await updateFinalExam(req.body.sid,req.body.cid);
   await Assessment.create({
    sid:req.body.sid,
    cid:req.body.cid,
    title:Title,
    type:4,
    weight:courseInfo.final.weight,
    num:(courseInfo.final.completed+1),
    grade:((finalExamGrade)/courseInfo.final.weight*100),
    totalGrade:100,
    best:courseInfo.final.best,
    totalNum:courseInfo.final.num
    
  })

  const update= await updateWeight(req.body.sid,req.body.cid,4,courseInfo.final);
  console.log('update',update);

  }

}

});

router.get('/assessments/:sid/:cid/:type',(req,res)=>{
  Assessment.find({sid:req.params.sid,cid:req.params.cid,type:req.params.type},{title:1,num:1,grade:1,totalGrade:1}).sort({num:-1}).then((assessments)=> {res.send({assessments,});} ).catch((e)=>{res.send(e)});

});

router.get('/allExams/:sid/:cid/:type',async(req,res)=>{
  Assessment.find({sid:req.params.sid,cid:req.params.cid,type:req.params.type},{title:1,num:1,grade:1,totalGrade:1}).then((courses)=> {res.send(courses);} ).catch((e)=>{res.send(e)});

});

router.get('/gpa/:sid',async(req,res)=>{

  let gpa = await GPA.find({sid:req.params.sid})
  console.log(gpa);

  if(gpa.length!=0){
    await GPA.remove({sid:req.params.sid})
  }


    let grades = await FinalGrade.find({sid:req.params.sid})

    console.log(grades)

    let totalPoints = 0;
    let totalHours = 0;

  let studentGPA = grades.reduce((prev, x) => {
    totalPoints += x.numeric*x.hours;
    totalHours += x.hours;

    return  totalPoints/totalHours;
  }, 0);

  console.log('totalPoints',totalPoints);
  console.log('totalHours',totalHours);
  console.log('studentGPA',studentGPA);

  let letterGPA= await Numeric.findOne({numeric:studentGPA});
  letterGPA=letterGPA.result;
  console.log(letterGPA);



   await GPA.create({
    sid:req.params.sid,
    gpa:studentGPA,
    gpaLetter:letterGPA

  })//.then((response)=> {res.send(response)}).catch((e)=>{res.send(e)});

  await GPA.find({sid:req.params.sid}).then((response)=> {res.send(response)}).catch((e)=>{res.send(e)});
  //await GPA.find({sid:req.params.sid}).then((response)=> {res.send(response)}).catch((e)=>{res.send(e)});


});

router.get('/allScores/:sid',(req,res)=>{
   FinalGrade.find({sid:req.params.sid},{title:1,hours:1,result:1,numeric:1}).sort({hours:-1}).then((response)=> {res.send(response)}).catch((e)=>{res.send(e)});
});

async function updateFinalExam(Sid,Cid){
  const courseInfo = await Weights.findOne({sid:Sid,cid:Cid});

  return 100-courseInfo.assignments.results-courseInfo.quizzes.results-courseInfo.midterms.results-courseInfo.projects.results;

}



//posts the neumerical final grade the student gets in a course
/*router.post('/finalGrades',async(req,res)=>{

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
  
});*/

/*router.get('/expectations',async(req,res)=>{

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


  
});*/



//endpoint to get the best percentage a student can get out of an assessment(quizzes,assignments,etc)
router.get('/bests/:sid/:cid/:type',async(req,res)=>{
  const courseInfo = await Weights.findOne({sid:req.params.sid,cid:req.params.cid});

  const Type = Number(req.params.type);

  
  console.log('type:',Number(Type)===3);

  const assessmentInfo = Type===0?courseInfo.assignments:Type===1?courseInfo.quizzes:Type===2?courseInfo.midterms:Type===3?courseInfo.projects:courseInfo.final;
  console.log(assessmentInfo);

  //const result = await getBest(req.params.sid,req.params.cid,req.params.type,assessmentInfo.best);
  res.send([{performance:assessmentInfo.results}])
  
  

});



module.exports=router
