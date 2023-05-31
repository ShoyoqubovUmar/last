const Teacher = require('../../models/lol')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.index = async (req,res)=>{
    let data = await Teacher.find({})
    if(data){
        res.json({title:"All teacher",data})
    }
}
exports.show = async (req,res)=>{
    let data = await Teacher.findById(req.params.id)
    if(data){
        res.json({title:"Special teacher",data})
    }
}
exports.create = async (req,res)=>{
    let {firstName, lastName, email,subject, phone, password,login}=req.body
    if(firstName && lastName && email && subject && phone&& password && login){
        let teacher = new Teacher({
            firstName,
            lastName,
            email,
            phone,
            password,
            subject,
            login
        })
        teacher.save()
        .then(async data=>{
            let hash = await bcrypt.hash(password, 10)
            let DATA = await Teacher.create({...req.body, password:hash})
            if(data){
                    res.json({title:"User created",data:data})
            }
        })
    }else{
        res.json({title:'malumot toliq kiritilmagan'})
    }
}
exports.remove = async (req,res)=>{
    let data = await Teacher.findByIdAndDelete(req.params.id)
    if(data){
        res.json({title:"Teacher removed",data})
    }
}
exports.edit = async (req,res)=>{
    let {firstName, lastName, email,subject, phone, password,login}=req.body
    if(firstName || lastName || email || subject || phone|| password || login){
        let data = await Teacher.findByIdAndUpdate(req.params.id,req.body)
        if(data){
            res.json({title:"Teacher edited ",data})
        }
    }else{
        res.json({title:'malumot yoq'})
    }
}