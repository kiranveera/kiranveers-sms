const jwt=require("jsonwebtoken");
const secretkey="secret"
var authorization=(req,res,next)=>{
    console.log(req.headers)
    //read authorization  in req object
    var token=req.headers["authorization"]
    //if token is found check for validity
    if (token==undefined){
        return res.json({message:"unauthorized access"})   
    }
    if(token.startsWith("Bearer "))
    {
        token=token.slice(7,token.length);
        jwt.verify(token,secretkey,(err,decoded)=>{
            if(err){
                return res.json({message:"invalid"})
            }
            //forward to next middleware
            next()
        })
    }
}
module.exports=authorization
  