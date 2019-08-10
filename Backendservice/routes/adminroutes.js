const exp=require("express") 
var adminroutes=exp.Router()
const bodyparser=require('body-parser')
adminroutes.use(bodyparser.json())
const initDb=require('../DBconfig').initDb
const getDb=require('../DBconfig').getDb
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const   secretkey="secret"
const Authorization=require('../middleware/authorization')
//admin login
adminroutes.post('/adminlogin',(req,res,next)=>{
    dbo=getDb();
    dbo.collection("admincollection").find({rollnumber:{$eq:req.body.rollnumber}}).toArray((err,userArray)=>{
        if(userArray.length==0){
            res.json({message:"Invalid admin"})
        }
        else if(userArray[0].password!==req.body.password){
            res.json({message:"Invalid admin password"})
        }
        else{
            const signedToken=jwt.sign({rollno:userArray[0].rollnumber},secretkey,{expiresIn:"50000"})
            res.json({message:"admin success",token:signedToken})
        }
    })
})
// update profiles
adminroutes.put('/updateprofile',(req,res,next)=>{
    console.log(req.body)
    dbo=getDb()
   
    dbo.collection("addstudentscollection").update({rollnumber:{$eq:req.body.rollnumber}},{$set:{rollnumber:req.body.rollnumber,
        studentname:req.body.studentname,class:req.body.class,}},(err,success)=>{
        if(err)
        {
          next(err)
        }
        else{
          res.json({message:"success"})
        }
    
})
  })


//delete student
adminroutes.delete('/delete/:name',(req,res,next)=>
    {
        console.log(req.params);
       //delete student profile with name as " req .params.name"
        dbo=getDb();
        dbo.collection("addstudentscollection").deleteOne({name:{$eq:req.params.studentname}},(err,success)=>
        {
            if (err)
           {
                 next(err)
             }
            else
           {
                dbo.collection("addstudentscollection").find().toArray((err,dataArray)=>
            {
               if(err)
                       {
                        next(err)
                       }
             else 
                      {
                         res.json({"message":"Record deleted",
                                         data:dataArray  })
                      }
              
                 })
            }
       })

    })

// admin student profiles
initDb()
adminroutes.get('/read',(req,res)=>{
    dbo=getDb()
    dbo.collection("addstudentscollection").find().toArray((err,dataArray)=>
    {
        if(err)
        {
         console.log(" error in data reading")
         console.log(err)
        }
        else if(dataArray.length==0)
        {
       res.json({"message":"no data found"})
        }
        else
        {
         res.json({"message":dataArray})
        }
    })
 })

//hashing operation for password
adminroutes.post('/send',Authorization,(req,res,next)=>
{
dbo=getDb()
dbo.collection("addstudentscollection").find({rollnumber:{$eq:req.body.rollnumber}}).toArray((err,userArray)=>{
    if(userArray=="")
    {
        bcrypt.hash(req.body.password,5,(err,hashpassword)=>
      {
      if(err)
     {
        next(err)
     }
     else
     {
       req.body.password=hashpassword
       console.log(req.body) 
       dbo.collection("addstudentscollection").insertOne(req.body,(err,success)=>{
           if(err)
           {
            next(err)
           }
           else
           {
            res.json({message:"student added successfully"})
           }
       })
     }
    })
    }
else
{
    res.json({message:"user already exists"})
}

})

})
  



//post notification
adminroutes.post('/noti',(req,res)=>{
    dbo=getDb()
   
    if(req.body=={})
    {
        res.json({"message":"server didn't recieve data"})
    }
    else 
    {
        dbo.collection("sendnotificationscollection").insertOne(req.body,(err,dataArray)=>
        {
            if (err)
            {
                console.log("error in inserting data")
            }
            else
            {
                res.json({message:"successfully inserted"})
            }
        })
    }
})



// update fees
adminroutes.put('/updatefees',(req,res,next)=>{
    console.log(req.body)
    dbo=getDb()
    dbo.collection("updatefeesdetailcollection").update({rollnumber:{$eq:req.body.rollnumber}},{$set:{rollnumber:req.body.rollnumber,
        studentname:req.body.studentname,paidfees:req.body.paidfees,totalfees:req.body.totalfees,pendingfees:req.body.pendingfees}},(err,success)=>{
        if(err)
        {
          next(err)
        }
        else{
          res.json({message:"success"})
        }
    })
  })


// delete fees

adminroutes.delete('/deletefees/:rollnumber',(req,res,next)=>
    {
        
        
        console.log(req.params);
        //delete student fees with name as " req .params.name"
        dbo=getDb();
        dbo.collection("updatefeesdetailcollection").deleteOne({rollnumber:{$eq:req.params.rollnumber}},(err,success)=>
        {
            if (err)
            {
                next(err)
            }
            else
            {
                
                dbo.collection("updatefeesdetailcollection").find().toArray((err,dataArray)=>
            {
              if(err)
                      {
                       next(err)
                      }
              else 
                      {
                          
                         res.json({"message":"Record deleted",
                                         data:dataArray  })
                      }
              
                })
            }
        })

    })









//post fees status
adminroutes.post('/fees',(req,res)=>{
    dbo=getDb()
   
    if(req.body=={})
    {
        res.json({"message":"server didn't recieve data"})
    }
    else 
    {
        dbo.collection("updatefeesdetailcollection").insertOne(req.body,(err,dataArray)=>
        {
            if (err)
            {
                console.log("error in inserting data")
            }
            else
            {
                res.json({message:"successfully inserted"})
            }
        })
    }
})
// update marks
adminroutes.put('/updatemarks',(req,res,next)=>{
    console.log(req.body)
    dbo=getDb()
    dbo.collection("postmarkscollection").update({rollnumber:{$eq:req.body.rollnumber}},{$set:{rollnumber:req.body.rollnumber,
        studentname:req.body.studentname,SUBJECTNAME:req.body.SUBJECTNAME,MARKS:req.body.MARKS,TOTALMARKS:req.body.TOTALMARKS}},(err,success)=>{
        if(err)
        {
          next(err)
        }
        else{
          res.json({message:"success"})
        }
    })
  })

// delete marks

adminroutes.delete('/deletemarks/:rollnumber',(req,res,next)=>
    {
        
       
        console.log(req.params);
        //delete student marks with name as " req .params.name"
        dbo=getDb();

        dbo.collection("postmarkscollection").deleteOne({rollnumber:{$eq:req.params.rollnumber}},(err,success)=>
        {
            if (err)
            {
                next(err)
            }
            else
            {
                
                dbo.collection("postmarkscollection").find().toArray((err,dataArray)=>
            {
              if(err)
                      {
                       next(err)
                      }
              else 
                      {
                          
                         res.json({"message":"Record deleted",
                                         data:dataArray  })
                      }
              
                })
            }
        })

    })

//post marks
adminroutes.post('/marks',(req,res)=>{
   
    dbo=getDb()
    
    if(req.body=={})
    {
        res.json({"message":"server didn't recieve data"})
    }
    else 
    {
        dbo.collection("postmarkscollection").insertOne(req.body,(err,dataArray)=>
        {
            if (err)
            {
                console.log("error in inserting data")
            }
            else
            {
                dbo.collection("postmarkscollection").find().toArray((err,result)=>
                {
                    if(err)
                    {
                        console.log(err)
                    }
                    else
                    {
                        res.json({message:"successfully inserted",
                                    data:result
                    })
                    }
                })
            }
        })
    }
})
// update attendance
adminroutes.put('/updateatt',(req,res,next)=>{
    console.log(req.body)
    dbo=getDb()
    dbo.collection("postattendencecollection").update({rollnumber:{$eq:req.body.rollnumber}},{$set:{rollnumber:req.body.rollnumber,
       attendancemonth:req.body.attendancemonth,attendanceformonth:req.body.attendanceformonth,totalattendance:req.body.totalattendance}},(err,success)=>{
          
        if(err)
        {
          next(err)
        }
        else{
          res.json({message:"success"})
        }
    })
  })
// delete attendance

adminroutes.delete('/deleteattendance/:rollnumber',(req,res,next)=>
    {
        
        
        console.log(req.params);
        //delete student fees with name as " req .params.name"
        dbo=getDb();
        dbo.collection("postattendencecollection").deleteOne({rollnumber:{$eq:req.params.rollnumber}},(err,success)=>
        {
            if (err)
            {
                next(err)
            }
            else
            {
                
                dbo.collection("postattendencecollection").find().toArray((err,dataArray)=>
            {
              if(err)
                      {
                       next(err)
                      }
              else 
                      {
                          
                         res.json({"message":"Record deleted",
                                         data:dataArray  })
                      }
              
                })
            }
        })

    })


// post attendance
adminroutes.post('/attendance',(req,res)=>{
    dbo=getDb()
   
    if(req.body=={})
    {
        res.json({"message":"server didn't recieve data"})
    }
    else 
    {
        dbo.collection("postattendencecollection").insertOne(req.body,(err,dataArray)=>
        {
            if (err)
            {
                console.log("error in inserting data")
            }
            else
            {
                res.json({message:"successfully inserted"})
            }
        })
    }
})
//


//login operation

adminroutes.post('/login',(req,res,next)=>{
    dbo=getDb()
  
    dbo.collection("addstudentscollection").find({rollnumber:{$eq:req.body.rollnumber}}).toArray((err,userArray)=>
    {
      
        if(userArray.length===0)
        {
          
            res.json({message:"invalid user"})
        }
      else
      { bcrypt.compare(req.body.password,userArray[0].password,(err,result)=>
        {
            if(result==true)
            {
                const signedToken=jwt.sign({rollno:userArray[0].rollnumber},secretkey,{expiresIn:"20000"})
              res.json({message:"success",token:signedToken, data:userArray});
            }
  
          else
          {
              res.json({message:"invalid password"})
          }
        })
         
      }
    })
})
// request
adminroutes.post('/saveresponse',Authorization,(req,res,next)=>
{
  dbo=getDb()
  if(req.body=={}) 
  {
      res.json({message:"server did not receive data"})
  }else
  {
    dbo.collection("leaveresponcecollection").insertOne(req.body,(err,dataArray)=>{
        if(err){
          next(err)
        }
        else{
            //res.json({message:"successfully inserted"})
            dbo.collection("leaverequestcollection").deleteOne({rollnumber:{$eq:req.body.rollnumber}},(err,dataArray)=>{
              if(err)
              {
                next(err)
              }
              else
              {
                res.json({message:"send responce successfully",data:dataArray})
              }
            })
        }
    })
  }
    
})
adminroutes.get('/getrequest',(req,res,next)=>
{
  dbo=getDb()
  dbo.collection('leaverequestcollection').find().toArray((err,dataArray)=>{
    if(err)
    {
      next(err)
    }
    else{
      res.json({message:dataArray})
    }
  })
    
})

//error handling middleware 
app.use ((err,req,res,next)=>
{
    console.log(err)
})

//exporting adminroutes module
module.exports=adminroutes
