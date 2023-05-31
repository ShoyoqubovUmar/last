const Lol = require("../models/lol");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.signUp = async(req,res)=>{
    const {login, password} = req.body
    const user = await Lol.findOne({login})
    if(user){
        res.json({title:"ERROR", message:"bunday user mavjud"})
    }
    else{
        try{

            let hash = await bcrypt.hash(password, 10)
            // let admin = process.env.PASSWORD[0] == req.query.password
            if(process.env.PASSWORD == req.query.password){
                let data = await Lol.create({...req.body, status:'admin', password:hash})
                res.json({title:"success",message:"Admin created",data})
            }else if(process.env.PASSWORD1 == req.query.password){
                let data = await Lol.create({...req.body,status:'teacher', password:hash})
                res.json({title:"success",message:"Teacher created",data})
            }else{
                let data = await Lol.create({...req.body,status:'student', password:hash})
                res.json({title:"success",message:"student created",data})
            }
            
        }catch(e){
            res.json({title:"ERROR",message:e, desc:"refence error"})
        }
    }
}
exports.signIn = async(req,res)=>{
    const {login, password} = req.body
    const user = await Lol.findOne({login})
    if(!user){
        res.json({title:"ERROR", message:"bunday user mavjud emas"})
    }
    else{
        let isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
        res.json({title:"ERROR", message:"password is false"})
        }else{
            let payload = {
                id: user.id,
                status:user.status
            }
            const token = await jwt.sign(payload,"Key", {expiresIn:'1h'})
            res.json({title:"Success", message:"welcome",token})
        }
    }
}