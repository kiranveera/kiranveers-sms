const exp=require("express") 
var studentroutes=exp.Router()
const bodyparser=require('body-parser')
studentroutes.use(bodyparser.json())
const initDb=require('../DBconfig').initDb
const getDb=require('../DBconfig').getDb
const   secretkey="secret"
const Authorization=require('../middleware/authorization')
initDb()

//get specific profile

studentroutes.post('/viewspecificprofile',Authorization,(req,res)=>{
    dbo=getDb()
    dbo.collection("addstudentscollection").find({rollnumber:{$eq:req.body.rollnumber}}).toArray((err,dataArray)=>
    {
        if(err)
        {
       
         console.log(err)
        } else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
       else
        {
           
         res.json({"message":dataArray})
        }
    })
 })

//get profiles

studentroutes.get('/readdata',Authorization,(req,res)=>{
    dbo=getDb()
    dbo.collection("addstudentscollection").find().toArray((err,dataArray)=>
    {
        if(err)
        {
       
         console.log(err)
        } else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
       else
        {
           
         res.json({"message":dataArray})
        }
    })
 })




//get specific attendance 

studentroutes.post('/viewspecificattendance',Authorization,(req,res)=>{
    dbo=getDb()
    dbo.collection("postattendencecollection").find({rollnumber:{$eq:req.body.rollnumber}}).toArray((err,dataArray)=>
    {
        if(err)
        {
       
         console.log(err)
        } else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
       else
        {
           
         res.json({"message":dataArray})
        }
    })
 })

//get attendance 

studentroutes.get('/viewattendance',Authorization,(req,res)=>{
    dbo=getDb()
    dbo.collection("postattendencecollection").find().toArray((err,dataArray)=>
    {
        if(err)
        {
         
         console.log(err)
        } else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
       else
        {
            
         res.json({"message":dataArray})
        }
    })
 })
 // get specific marks
 
studentroutes.post('/viewspecificmarks',Authorization,(req,res)=>{
    dbo=getDb()
    console.log(req.body)
    dbo.collection("postmarkscollection").find({rollnumber:{$eq:req.body.rollnumber}}).toArray((err,dataArray)=>
    {
        if(err)
        {
        console.log(err)
        } else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
       else
        {
            
         res.json({"message":dataArray})
        }
    })
 })

 //get all marks
 studentroutes.get('/viewmarks',Authorization,(req,res)=>{
    dbo=getDb()
    console.log(req.body)
    dbo.collection("postmarkscollection").find().toArray((err,dataArray)=>
    {
        if(err)
        {
        
         console.log(err)
        } else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
       else
        {
            
         res.json({"message":dataArray})
        }
    })
 })

//get specific fees

studentroutes.post('/viewspecficfees',Authorization,(req,res)=>{
    dbo=getDb()
    dbo.collection("updatefeesdetailcollection").find({rollnumber:{$eq:req.body.rollnumber}}).toArray((err,dataArray)=>
    {
        if(err)
        {
        
         console.log(err)
        } else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
       else
        {
           
         res.json({"message":dataArray})
        }
    })
 })


 //fees status
 
studentroutes.get('/feesstatus',Authorization,(req,res)=>{
    dbo=getDb()
    dbo.collection("updatefeesdetailcollection").find().toArray((err,dataArray)=>
    {
        if(err)
        {
       
         console.log(err)
        } else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
       else
        {
           
         res.json({"message":dataArray})
        }
    })
 })
//Get attandance
studentroutes.get('/notifications',Authorization,(req,res)=>{
    dbo=getDb()
    dbo.collection("sendnotificationscollection").find().toArray((err,dataArray)=>
    {
        if(err)
        {
        
         console.log(err)
        } else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
       else
        {
          
         res.json({"message":dataArray})
        }
    })
 })
 
// send leave request
studentroutes.post('/viewspecificrequest',Authorization,(req,res,next)=>
{
  dbo=getDb()
  dbo.collection('leaveresponcecollection').find({rollnumber:{$eq:req.body.rollnumber}}).toArray((err,dataArray)=>{
    if(err)
    {
      next(err)
    }
    else{
      res.json({message:dataArray})
    }
  })
    
})
//
studentroutes.post('/saverequest',(req,res)=>
{
  dbo=getDb()
  if(req.body=={}) 
  {
      res.json({message:"server did not receive data"})
  }else
  {
    dbo.collection("leaverequestcollection").insertOne(req.body,(err,dataArray)=>{
        if(err){
            console.log('error in saving data')
        }
        else{
            //res.json({message:"successfully applied for leave"})
            dbo.collection("leaveresponcecollection").deleteOne({rollnumber:{$eq:req.body.rollnumber}},(err,dataArray)=>{
              if(err)
              {
                next(err)
              }
              else
              {
                res.json({message:"successfully applied for leave",data:dataArray})
              }
            })
        }
    })
  }
    
})

//exporting adminroutes module
module.exports=studentroutes

