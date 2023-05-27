const jwt= require('jsonwebtoken')
module.exports= (req,res,next)=>{
    // first it will try this 
    try{
        const token=req.headers.authorization ;  // will look for token in headers authorization 
       const verifiedtoken= jwt.verify(token,"InstaClone"); // verify token with the secret code 
       // and return the information  passed to it during generation
        req.id=verifiedtoken.id  // add id to request body
        next(); // after verification it will run code written after this
    }
    catch{
        res.send("auth failed at token verification") // if failed to verify then it will execute
    }
}