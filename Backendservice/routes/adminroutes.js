const exp = require("express")
var adminroutes = exp.Router()
const bodyparser = require('body-parser')
adminroutes.use(bodyparser.json())
const initDb = require('../DBconfig').initDb
const getDb = require('../DBconfig').getDb
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = "secret"
const nodemailer = require('nodemailer')
const Authorization = require('../middleware/authorization')
const accountSid = 'ACa0a5cda8cf656e7f092bda9a1d55cb1a';
const authToken = '772eabd8981d393202429f75d0a72bbd';
const client = require('twilio')(accountSid, authToken);
//admin login
adminroutes.post('/adminlogin', (req, res, next) => {
    dbo = getDb();
    dbo.collection("admincollection").find({ rollnumber: { $eq: req.body.rollnumber } }).toArray((err, userArray) => {
        if (userArray.length == 0) {
            res.json({ message: "Invalid admin" })
        }
        else if (userArray[0].password !== req.body.password) {
            res.json({ message: "Invalid admin password" })
        }
        else {
            const signedToken = jwt.sign({ rollno: userArray[0].rollnumber }, secretkey, { expiresIn: "7d" })
            res.json({ message: "admin success", token: signedToken })
        }
    })
})
// update profiles
adminroutes.put('/updateprofile', Authorization, (req, res, next) => {
    console.log(req.body)
    dbo = getDb()

    dbo.collection("addstudentscollection").update({ rollnumber: { $eq: req.body.rollnumber } }, {
        $set: {
            rollnumber: req.body.rollnumber,
            studentname: req.body.studentname, class: req.body.class,
            gmail:req.body.gmail,phnumber:req.body.phnumber
        }
    }, (err, success) => {
        if (err) {
            next(err)
        }
        else {
            res.json({ message: "success" })
        }

    })
})


//delete student
adminroutes.delete('/delete/:name', Authorization, (req, res, next) => {
    console.log(req.params);
    //delete student profile with name as " req .params.name"
    dbo = getDb();
    dbo.collection("addstudentscollection").deleteOne({ name: { $eq: req.params.studentname } }, (err, success) => {
        if (err) {
            next(err)
        }
        else {
            dbo.collection("addstudentscollection").find().toArray((err, dataArray) => {
                if (err) {
                    next(err)
                }
                else {
                    res.json({
                        "message": "Record deleted",
                        data: dataArray
                    })
                }

            })
        }
    })

})

// admin student profiles
initDb()
adminroutes.get('/read', Authorization, (req, res) => {
    dbo = getDb()
    dbo.collection("addstudentscollection").find().toArray((err, dataArray) => {
        if (err) {
            console.log(" error in data reading")
            console.log(err)
        }
        else if (dataArray.length == 0) {
            res.json({ "message": "no data found" })
        }
        else {
            res.json({ "message": dataArray })
        }
    })
})
// adding student
//hashing operation for password
adminroutes.post('/send', Authorization, (req, res, next) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'veerakiran444@gmail.com',
            pass: 'kiranveera0101',
        },
    });
    let info = transporter.sendMail({
        // sender address
        from: '" SARASWATHI HIGH SCHOOL " <veerakiran444@gmail.com>',
        // list of receivers
        to: req.body.gmail,
        subject: "student credentials", // Subject line
        text: `rollnumber: ${req.body.rollnumber},password: ${req.body.password}`,
        // plain text body
        //html: "<b>Hello world?</b>" // html body
    });
    dbo = getDb()
    dbo.collection("addstudentscollection").find({ rollnumber: { $eq: req.body.rollnumber } }).toArray((err, userArray) => {
        if (userArray == "") {
            bcrypt.hash(req.body.password, 5, (err, hashpassword) => {
                if (err) {
                    next(err)
                }
                else {
                    req.body.password = hashpassword
                    // console.log(req.body)
                    dbo.collection("addstudentscollection").insertOne(req.body, (err, success) => {
                        if (err) {
                            next(err)
                        }
                        else {
                            res.json({ message: "student added successfully" })
                        }
                    })
                }
            })
        }
        else {
            res.json({ message: "user already exists" })
        }

    })

})




//post notification
adminroutes.post('/noti', Authorization, (req, res) => {
    dbo = getDb()

    if (req.body == {}) {
        res.json({ "message": "server didn't recieve data" })
    }
    else {
        dbo.collection("sendnotificationscollection").insertOne(req.body, (err, dataArray) => {
            if (err) {
                console.log("error in inserting data")
            }
            else {
                res.json({ message: " notification send successfully" })
            }
        })
    }
})



// update fees
adminroutes.put('/updatefees', Authorization, (req, res, next) => {
    console.log(req.body)
    dbo = getDb()
    dbo.collection("updatefeesdetailcollection").update({ rollnumber: { $eq: req.body.rollnumber } }, {
        $set: {
            rollnumber: req.body.rollnumber,
            studentname: req.body.studentname, paidfees: req.body.paidfees, totalfees: req.body.totalfees, pendingfees: req.body.pendingfees
        }
    }, (err, success) => {
        if (err) {
            next(err)
        }
        else {
            res.json({ message: "success" })
        }
    })
})


// delete fees

adminroutes.delete('/deletefees/:rollnumber', Authorization, (req, res, next) => {


    console.log(req.params);
    //delete student fees with name as " req .params.name"
    dbo = getDb();
    dbo.collection("updatefeesdetailcollection").deleteOne({ rollnumber: { $eq: req.params.rollnumber } }, (err, success) => {
        if (err) {
            next(err)
        }
        else {

            dbo.collection("updatefeesdetailcollection").find().toArray((err, dataArray) => {
                if (err) {
                    next(err)
                }
                else {

                    res.json({
                        "message": "Record deleted",
                        data: dataArray
                    })
                }

            })
        }
    })

})









//post fees status
adminroutes.post('/fees', Authorization, (req, res) => {
    dbo = getDb()

    if (req.body == {}) {
        res.json({ "message": "server didn't recieve data" })
    }
    else {
        dbo.collection("updatefeesdetailcollection").insertOne(req.body, (err, dataArray) => {
            if (err) {
                console.log("error in inserting data")
            }
            else {
                res.json({ message: "successfully posted fees status" })
            }
        })
    }
})
// update marks
adminroutes.put('/updatemarks', Authorization, (req, res, next) => {
    console.log(req.body)
    dbo = getDb()
    dbo.collection("postmarkscollection").update({ rollnumber: { $eq: req.body.rollnumber } }, {
        $set: {
            rollnumber: req.body.rollnumber,
            studentname: req.body.studentname, SUBJECTNAME: req.body.SUBJECTNAME, MARKS: req.body.MARKS, TOTALMARKS: req.body.TOTALMARKS
        }
    }, (err, success) => {
        if (err) {
            next(err)
        }
        else {
            res.json({ message: "success" })
        }
    })
})

// delete marks

adminroutes.delete('/deletemarks/:rollnumber', Authorization, (req, res, next) => {


    console.log(req.params);
    //delete student marks with name as " req .params.name"
    dbo = getDb();

    dbo.collection("postmarkscollection").deleteOne({ rollnumber: { $eq: req.params.rollnumber } }, (err, success) => {
        if (err) {
            next(err)
        }
        else {

            dbo.collection("postmarkscollection").find().toArray((err, dataArray) => {
                if (err) {
                    next(err)
                }
                else {

                    res.json({
                        "message": "Record deleted",
                        data: dataArray
                    })
                }

            })
        }
    })

})

//post marks
adminroutes.post('/marks', Authorization, (req, res) => {

    dbo = getDb()

    if (req.body == {}) {
        res.json({ "message": "server didn't recieve data" })
    }
    else {
        dbo.collection("postmarkscollection").insertOne(req.body, (err, dataArray) => {
            if (err) {
                console.log("error in inserting data")
            }
            else {
                dbo.collection("postmarkscollection").find().toArray((err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.json({
                            message: "successfully posted marks",
                            data: result
                        })
                    }
                })
            }
        })
    }
})
// update attendance
adminroutes.put('/updateatt', Authorization, (req, res, next) => {
    console.log(req.body)
    dbo = getDb()
    dbo.collection("postattendencecollection").update({ rollnumber: { $eq: req.body.rollnumber } }, {
        $set: {
            rollnumber: req.body.rollnumber,
            attendancemonth: req.body.attendancemonth, attendanceformonth: req.body.attendanceformonth, totalattendance: req.body.totalattendance
        }
    }, (err, success) => {

        if (err) {
            next(err)
        }
        else {
            res.json({ message: "success" })
        }
    })
})
// delete attendance

adminroutes.delete('/deleteattendance/:rollnumber', Authorization, (req, res, next) => {


    console.log(req.params);
    //delete student fees with name as " req .params.name"
    dbo = getDb();
    dbo.collection("postattendencecollection").deleteOne({ rollnumber: { $eq: req.params.rollnumber } }, (err, success) => {
        if (err) {
            next(err)
        }
        else {

            dbo.collection("postattendencecollection").find().toArray((err, dataArray) => {
                if (err) {
                    next(err)
                }
                else {

                    res.json({
                        "message": "Record deleted",
                        data: dataArray
                    })
                }

            })
        }
    })

})


// post attendance
adminroutes.post('/attendance', Authorization, (req, res) => {
    dbo = getDb()

    if (req.body == {}) {
        res.json({ "message": "server didn't recieve data" })
    }
    else {
        dbo.collection("postattendencecollection").insertOne(req.body, (err, dataArray) => {
            if (err) {
                console.log("error in inserting data")
            }
            else {
                res.json({ message: "successfully posted attendance " })
            }
        })
    }
})
//


//login operation

adminroutes.post('/login', (req, res, next) => {
    dbo = getDb()

    dbo.collection("addstudentscollection").find({ rollnumber: { $eq: req.body.rollnumber } }).toArray((err, userArray) => {

        if (userArray.length === 0) {

            res.json({ message: "invalid user" })
        }
        else {
            bcrypt.compare(req.body.password, userArray[0].password, (err, result) => {
                if (result == true) {
                    const signedToken = jwt.sign({ rollno: userArray[0].rollnumber }, secretkey, { expiresIn: "7d" })
                    res.json({ message: "success", token: signedToken, data: userArray });
                }

                else {
                    res.json({ message: "invalid password" })
                }
            })

        }
    })
})
// request
adminroutes.post('/saveresponse',Authorization,(req, res, next) => {
    dbo = getDb()
    if (req.body == {}) {
        res.json({ message: "server did not receive data" })
    } else {
        dbo.collection("leaveresponcecollection").insertOne(req.body, (err, dataArray) => {
            if (err) {
                next(err)
            }
            else {
                //res.json({message:"successfully inserted"})
                dbo.collection("leaverequestcollection").deleteOne({ rollnumber: { $eq: req.body.rollnumber } }, (err, dataArray) => {
                    if (err) {
                        next(err)
                    }
                    else {
                        res.json({ message: "send responce successfully", data: dataArray })
                    }
                })
            }
        })
    }

})
adminroutes.get('/getrequest',Authorization,(req, res, next) => {
    dbo = getDb()
    dbo.collection('leaverequestcollection').find().toArray((err, dataArray) => {
        if (err) {
            next(err)
        }
        else {
            res.json({ message: dataArray })
        }
    })

})
//resetpassword
adminroutes.post('/forgotpassword',(req,res,next)=>{
    console.log(req.body)
    dbo=getDb()
    dbo.collection('addstudentscollection').find({rollnumber:req.body.rollnumber}).toArray((err,userArray)=>{
        if(err){
            next(err)
        }
        else{
            if(userArray.length===0){
                res.json({message:"user not found"})
            }
            else{

                jwt.sign({rollnumber:userArray[0].rollnumber},secretkey,{expiresIn:3600},(err,token)=>{
                    if(err){
                     next(err);
                    }
                    else{
                        var OTP=Math.floor(Math.random()*99999)+11111;
                        console.log(OTP)
                        
                        client.messages.create({
                            body: OTP,
                            from: '+12055513829', // From a valid Twilio number
                            to: '+918919554524',  // Text this number
  
                        })
                        .then((message) => {
                            dbo.collection('OTPCollection').insertOne({
                                OTP:OTP,
                                rollnumber:userArray[0].rollnumber,
                                OTPGeneratedTime:new Date().getTime()+15000
                        },(err,success)=>{
                            if(err){
                                next(err)
                            }
                            else{                                        
                                res.json({"message":"user found",
                                    "token":token,
                                    "OTP":OTP,
                                    "rollnumber":userArray[0].rollnumber
                                })
                            }
                        })
                        });

                    }
                    
                })
            }
        }
    })
})
//verify OTP
adminroutes.post('/verifyotp',(req,res,next)=>{
    console.log(req.body)
    console.log(new Date().getTime())
    var currentTime=new Date().getTime()
    dbo.collection('OTPCollection').find({"OTP":req.body.OTP}).toArray((err,OTPArray)=>{
        if(err){
            next(err)
        }
        else if(OTPArray.length===0){
            res.json({"message":"invalidOTP"})
        }
        else if(OTPArray[0].OTPGeneratedTime < req.body.currentTime){
            res.json({"message":"invalidOTP"})
        }
        else{
            
            dbo.collection('OTPCollection').deleteOne({OTP:req.body.OTP},(err,success)=>{
                if(err){
                    next(err);
                }
                else{
                    
                    res.json({"message":"verifiedOTP"})
                }
            })
        }
    })
  })
adminroutes.put('/changepassword',(req,res,next)=>{
 
  dbo=getDb()
  bcrypt.hash(req.body.password,6,(err,hashedPassword)=>{
      if (err) {
          next(err)
      } else {
          
          dbo.collection('addstudentscollection').updateOne({rollnumber:req.body.rollnumber},{$set:{
              password:hashedPassword
          }},(err,success)=>{
              if(err){
                  next(err)
              }
              else{
                  res.json({"message":"password changed"})
              }
          }) 
      }
  })
})


//error handling middleware 
app.use((err, req, res, next) => {
    console.log(err)
})

//exporting adminroutes module
module.exports = adminroutes
