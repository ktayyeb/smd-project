const express = require('express');
const router =express.Router();
const Assessment=require('../models/Assessment')
const GPA=require('../models/gpa')
const FinalGrade=require('../models/finalGrade')
const Weights=require('../models/weights')
const Numeric=require('../models/numeric')


//calculate the best percentage a student can get out of an assessment(quizzes,assignments,etc).
async function getBest(Sid,Cid, Type,Best) {
  
  let arr =  await Assessment.find({ sid:Sid, cid: Cid, type: Type });

  let x=[]

  for(let i=0;arr.length>i;i++){
    x.push({index:i,ratio:arr[i].grade/arr[i].totalGrade,num:arr[i].num});

  }
  
  x.sort((a, b) => a.ratio - b.ratio);

  for(let j=0;Best>j;j++){
    x.pop();
  }



  //let remove=x.splice(0, arr.length-Best);

  console.log('x',x);
  //console.log('remove',remove);

  for(let i=0;x.length>i;i++){

    for(let j=0;arr.length>j;j++){
      if(x[i].num===arr[j].num){

        arr.splice(j,1);
        console.log('array now',arr);
      }    
  }

  }

  console.log('array',arr);

  let score = 0;
  let total = 0;

  const len=arr.length
  let ratio=0
  
  
  if (len>=Best){
    ratio=1
  }
  else{
    ratio=len/Best
  }

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
//the user cannot provide more assignments than the total num assigned at the beginning.
router.post('/assessment',async(req,res)=>{

  const courseInfo = await Weights.findOne({sid:req.body.sid,cid:req.body.cid});

  const Type = req.body.type;

  const assessmentInfo = Type===0?courseInfo.assignments:Type===1?courseInfo.quizzes:Type===2?courseInfo.midterms:Type===3?courseInfo.projects:courseInfo.final;
  
  if(assessmentInfo.completed>=assessmentInfo.num){
    res.send({message:"You inserted all of your assessments here!"});
    
  }

  else{

  await Assessment.create({
    sid:req.body.sid,                      //student id
    cid:req.body.cid,                     //course id
    title:courseInfo.title,              //name of the course
    type:Type,                          //type of assessment 0:assignment ,1:quiz, 2:midterm, 3:project 4:final
    weight:assessmentInfo.weight,      //the weight of the assessment from thw whole course work
    num:(assessmentInfo.completed+1), //assessment no.
    grade:req.body.grade,            //student's grade in this assignment
    totalGrade:req.body.totalGrade, //the total grade of the assessment
    best:assessmentInfo.best,      //how many assessments are counted
    totalNum:assessmentInfo.num   //the total assessments the user shall provide in that type.
    
  }).then((a)=> {res.send(a);}).catch((e)=>{res.send(e)});

  const update= await updateWeight(req.body.sid,req.body.cid,Type,assessmentInfo);
  console.log('update',update);

  
  }

});


//function that updates course info (model:Weights) when the user submits hid grades in a specific asssessment.
//The no of assessments (according to type) the student has entered is incremented. 
//Also,the performance of the student in this type of assessments is updated.
//ex: if performance in assignments is equal to 10 
//that means that the student have gained 10% from the course work using assignments.

async function updateWeight(Sid,Cid,Type,assessment){
  //calculates the max percentage(from the total percentage of the course) the student can get after submitting the new assessment.
  const Results=await getBest(Sid,Cid, Type,assessment.best);

  if(Type===0){//assessment is an asssignment
  
  Weights.updateOne({sid:Sid,cid:Cid},{assignments:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else if(Type===1){//assessment is an quiz
  Weights.updateOne({sid:Sid,cid:Cid},{quizzes:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else if(Type===2){//assessment is a midterm exam
  Weights.updateOne({sid:Sid,cid:Cid},{midterms:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else if(Type===3){//assessment is a project
  Weights.updateOne({sid:Sid,cid:Cid},{projects:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else if(Type===4){//assessment is a final exam
  Weights.updateOne({sid:Sid,cid:Cid},{final:{num:assessment.num,weight:assessment.weight,best:assessment.best,completed:(assessment.completed+1),results:Results}})
  .then((update)=> {return update;}).catch((e)=>{console.log(e)});
}

else{
  return null;
}

}

//posts a new course
//the user cannot add the same course twice
router.post('/newCourse',async(req,res)=>{
  const courseInfo1 = await Weights.findOne({sid:req.body.sid,cid:req.body.cid});
  const courseInfo2 = await Weights.findOne({sid:req.body.sid,title:req.body.title});


  if(courseInfo1!=null||courseInfo2!=null){
    res.send({message:"this course has been added before"});
  }


else{
  await Weights.create(req.body).then((a)=> {res.send(a);} ).catch((e)=>{res.send(e)});
}
});

//get request that gets all the courses the student provided
router.get('/allCourses/:sid',(req,res)=>{
  Weights.find({sid:req.params.sid},{title:1,cid:1}).sort({title:-1}).then((courses)=> {res.send(courses);} ).catch((e)=>{res.send(e)});

});

//post request that we used to combine numeric final grade to the letter one
//example document from the model nymeric: {result:A+ numeric:0.7}
//it was implemented to post all the possible finalGrades from A+ to F
//this model helped to convert the letterGrade the user enters to numeric
//as we need the numeric grade to calculate the gpa
//i can easily convert the letter to numeric instead of using a huge bunch of if statements.

router.post('/numerics',(req,res)=>{
  Numeric.create(req.body).then((a)=> {res.send(a);} ).catch((e)=>{res.send(e)});
});

//post request saves the finalGrade(of a course) the user enters in collection finalGrade.
//the user cannot provide the final grade until the course work is completed
//as the student doesn't always know what is the grade he got in the final exam
//we calculate that for him(he doesn't need it to provide as the rest of the course work as he doesn't have access to it).
router.post('/finalGrade',async (req,res)=>{
  
  let numericScore = await Numeric.findOne({result:req.body.result});
  const finalGrade= await FinalGrade.findOne({sid:req.body.sid,cid:req.body.cid});

  const courseInfo = await Weights.findOne({sid:req.body.sid,cid:req.body.cid});

  if(courseInfo.assignments.completed<courseInfo.assignments.num || 
    courseInfo.quizzes.completed<courseInfo.quizzes.num ||
    courseInfo.midterms.completed<courseInfo.midterms.num ||
    courseInfo.projects.completed<courseInfo.projects.num
    ){
    res.send({message:"Please complete filling your course work"});
    
  }

  else{

  if(finalGrade!=null){res.send({message:"this course has been added before"});}
  
  else{
  numericScore=numericScore.numeric
  

  let course= await Weights.findOne({sid:req.body.sid,cid:req.body.cid})
  
  let hrs=course.hours

  let Title=course.title

  FinalGrade.create({
    sid:req.body.sid,

    cid:req.body.cid,

    hours:hrs,

    title:Title,

    result:req.body.result,

    numeric:numericScore
    
  }).then((a)=> {res.send(a)}).catch((e)=>{res.send(e)});

  //function that saves the record of the final exam in the db.
  //uses the function "finalExamGrade" to calculate the score of the final exam.

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


/*router.get('/assessments/:sid/:cid/:type',(req,res)=>{
  Assessment.find({sid:req.params.sid,cid:req.params.cid,type:req.params.type},{title:1,num:1,grade:1,totalGrade:1}).sort({num:-1}).then((assessments)=> {res.send({assessments,});} ).catch((e)=>{res.send(e)});
  
});*/

//get request that to find the courseWork of the student by type 
router.get('/allExams/:sid/:cid/:type',async(req,res)=>{
  Assessment.find({sid:req.params.sid,cid:req.params.cid,type:req.params.type},{title:1,num:1,grade:1,totalGrade:1}).then((courses)=> {res.send(courses);} ).catch((e)=>{res.send(e)});

});

//get request that calculates the gpa and updates it regularly when it's called
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

  let letterGPA= await Numeric.findOne({numeric:studentGPA});
  letterGPA=letterGPA.result;
  
   await GPA.create({
    sid:req.params.sid,
    gpa:studentGPA,
    gpaLetter:letterGPA

  })

  await GPA.find({sid:req.params.sid}).then((response)=> {res.send(response)}).catch((e)=>{res.send(e)});
  
});

//get reuest that finds all the finalGrades of the student to be used in the transcript.
router.get('/allScores/:sid',(req,res)=>{
   FinalGrade.find({sid:req.params.sid},{title:1,hours:1,result:1,numeric:1}).sort({hours:-1}).then((response)=> {res.send(response)}).catch((e)=>{res.send(e)});
});

//calculates the user's grade in the final exam.
async function updateFinalExam(Sid,Cid){
  const courseInfo = await Weights.findOne({sid:Sid,cid:Cid});

  let finalGrade= await FinalGrade.findOne({sid:Sid,cid:Cid});
  finalGrade=finalGrade.numeric;
  

  
  let sum = courseInfo.assignments.results+courseInfo.quizzes.results+courseInfo.midterms.results+courseInfo.projects.results;

  let maxGrade=sum+courseInfo.final.weight




  

  return 100-courseInfo.assignments.results-courseInfo.quizzes.results-courseInfo.midterms.results-courseInfo.projects.results;

}

router.get('/overallPerformance/:sid/:cid',async(req,res)=>{

  const courseInfo = await Weights.findOne({sid:req.params.sid,cid:req.params.cid});

  let sum=courseInfo.assignments.results+courseInfo.quizzes.results+courseInfo.midterms.results+courseInfo.projects.results+courseInfo.final.results;

  res.send([{total:sum}]);
  
  
});

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

router.get('/maxFinal/:sid/:cid',async(req,res)=>{

  const courseInfo = await Weights.findOne({sid:req.params.sid,cid:req.params.cid});
  const gradingScheme= await Numeric.find().sort({numeric:1});


  let sum=courseInfo.assignments.results+courseInfo.quizzes.results+courseInfo.midterms.results+courseInfo.projects.results;

  let finalWeight=courseInfo.final.weight;

  let arr=[];

  for (let i = 0; i < gradingScheme.length; i++) {
    let percentage=gradingScheme[i].percent;

    let x=sum+finalWeight;

    console.log('x',x);
    console.log('percentage',percentage);

    if(x<percentage){
      continue;

    }

    else if((percentage-sum)/finalWeight*100<0){
      continue;
    }

    else{

    arr.push({letter:gradingScheme[i].result,percent:round((percentage-sum)/finalWeight*100,1)});
    }
    
  }
  res.send(arr);
  
  
});




//endpoint to get the best percentage a student can get out of an assessment from the course info(model:Weights)(quizzes,assignments,etc)
router.get('/bests/:sid/:cid/:type',async(req,res)=>{
  const courseInfo = await Weights.findOne({sid:req.params.sid,cid:req.params.cid});

  const Type = Number(req.params.type);

  
  console.log('type:',Number(Type)===3);

  const assessmentInfo = Type===0?courseInfo.assignments:Type===1?courseInfo.quizzes:Type===2?courseInfo.midterms:Type===3?courseInfo.projects:courseInfo.final;
  console.log(assessmentInfo);

  res.send([{performance:assessmentInfo.results}])
  
  

});



module.exports=router
