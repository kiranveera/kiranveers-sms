const exp=require("express")
app=exp()
//import path
const Path=require("path")
console.log(__dirname)

//connecting  angular to server
app.use(exp.static(Path.join(__dirname,'../dist/project')))
// adminroutes

const adminroutes=require('./routes/adminroutes')
app.use("/admin",adminroutes)

  //studentroutes
  const studentroutes=require('./routes/studentroutes')
  app.use("/student",studentroutes)

const port=4700
app.listen(port,()=>{
    console.log (`server is running on ${port}...`)
})















