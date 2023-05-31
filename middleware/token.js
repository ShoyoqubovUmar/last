const jwt = require("jsonwebtoken")
exports.token = async (req,res,next)=>{
    let token = req.query.token || req.headers.authorization
    if(!token){
        res.json({title:"ERROR",message:"Token is not definded"})
    } else{
        try{
            let decoded = await jwt.verify(token, "Key")
            let user = {}
            user.id = decoded.id
            user.status = decoded.status
            req.user = user
            next()
        }catch(err){
            res.json({title:"ERROR",message:"Token wrong"});
        }
    }
}