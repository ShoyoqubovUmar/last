const Student = require('../../models/lol')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.index = async(req,res)=>{
    let {idTeacher} = req.query
    if(idTeacher){
        let data = await Student.findById(idTeacher) 
        res.json({title:"succsess",data})
    }
}

exports.show = async (req,res)=>{
    let data = await Student.findById(req.params.id)
    if(data){
        res.json({title:"Special student",data})
    }
}
exports.create = async (req,res)=>{
    let {firstName, lastName, email, phone, password,parentsNumber,login}=req.body
    if(firstName && lastName && email && phone && password && parentsNumber && login){
        let student = new Student({
            firstName,
            lastName,
            email,
            phone,
            password,
            login,
            parentsNumber:{
                mother:req.body.parentsNumber.mother,
                father:req.body.parentsNumber.father
            }
        })
        student.save()
        .then(async data=>{
            let hash = await bcrypt.hash(password, 10)
            let DATA = await Student.create({...req.body, password:hash})
            if(data){
                    res.json({title:"Student created",data:data})
            }
        })
    }else{
        res.json({title:'malumot toliq kiritilmagan'})
    }
}
exports.remove = async (req,res)=>{
    let data = await Student.findByIdAndDelete(req.params.id)
    if(data){
        res.json({title:"student removed",data})
    }
}
exports.edit = async (req,res)=>{
    let {firstName, lastName, email,subject, phone, parentsNumber, password}=req.body
    let {mother,father} = parentsNumber
    if(firstName || lastName || email || subject || phone || password || mother ||father ){
        let data = await Student.findByIdAndUpdate(req.params.id,req.body)
        if(data){
            res.json({title:"Student edited ",data})
        }
    }else{
        res.json({title:'malumot yoq'})
    }
}
exports.addStudentToGroup = async (req,res)=>{
    let {idTeacher, idGroup, idStudent} = req.body
    if(idTeacher && idGroup && idStudent){
        
        let teacher = await Student.findById(idTeacher)
        if(!teacher){
            res.json({title:"teacher not found"})
        }else{
            let student = await Student.findById(idTeacher, { group:{$elemMatch:{_id:idGroup}}})
            let lol = student.group[0].students.filter(elem=> elem == idStudent)
            if(lol.length > 0){
            res.json({title:"bunday oquvchi mavjud"})
            }else{
                let group = await Student.findOneAndUpdate(
                    {
                        _id:idTeacher,
                        "group._id":idGroup
                    },
                    {
                        $push: {
                        "group.$.students":idStudent
                    }})
                res.json({title:"success",group})
            }
        }
    }else{
            res.json({title:"DATA is not defined"})
    }
}
exports.removeStudentFromGroup = async (req,res)=>{
    let {idTeacher, idGroup, idStudent} = req.body
    if(idTeacher && idGroup && idStudent){
        if(!Lol){
            res.json({title:"teacher not found"})
        }else{
            let group = await Student.findOneAndUpdate(
                {
                    _id:idTeacher,
                    "group._id":idGroup
                },
                {
                    $pull: {
                    "group.$.students":idStudent
                }})
            res.json({title:"success",group})
        }
    }else{
            res.json({title:"DATA is not defined"})
    }
}