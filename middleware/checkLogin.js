exports.checkLogin = async(req,res,next)=>{
    const{login, password}= req.body
    if(login && password){
        next()
    }else{
        res.json({title:"error",message:"login password is not defined"})
    }
} 