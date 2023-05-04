const jwt =require("jsonwebtoken")
const SECRET_KEY="PRODUCTAPI"

const auth=(req,res,next)=>{
    try{
        let token =req.headers.authorization
        if(token){
            token=token.split(" ")[1]
            let user=jwt.verify(token,SECRET_KEY)
            req.id=user.id
        }
        else{
            res.status(401).json({message:"Unauthorized User"})
        }
        next()
    }catch (error){
        console.log(error)
        res.status(401).json({message:"something went wrong"})
    }
}
module.exports=auth