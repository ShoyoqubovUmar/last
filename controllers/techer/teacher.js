const Teacher = require('../../models/lol')

// exports.index = async (req,res)=>{
//     let data = await Teacher.find({})
//     if(data){
//         res.json({title:"Profile",data})
//     }
// }
exports.show = async (req,res)=>{
    let data = await Teacher.findById(req.params.id)
    if(data){
        res.json({title:"Profile",data})
    }
}
// exports.create = (req,res)=>{
//     let {firstName, lastName, email,subject, phone, password}=req.body
//     if(firstName && lastName && email && subject && phone&& password){
//         let teacher = new Teacher({
//             firstName,
//             lastName,
//             email,
//             phone,
//             password,
//             subject,
//         })
//         teacher.save()
//         .then(data=>{
//             if(data){
//                     res.json({title:"User created",data:data})
//             }
//         })
//     }else{
//         res.json({title:'malumot toliq kiritilmagan'})
//     }
// }
// exports.remove = async (req,res)=>{
//     let data = await Teacher.findByIdAndDelete(req.params.id)
//     if(data){
//         res.json({title:"Teacher removed",data})
//     }
// }
exports.edit = async (req,res)=>{
    let {firstName, lastName, email,subject, phone, password}=req.body
    if(firstName || lastName || email || subject || phone|| password){
        let data = await Teacher.findByIdAndUpdate(req.params.id,req.body)
        if(data){
            res.json({title:"Profile edited ",data})
        }
    }else{
        res.json({title:'malumot yoq'})
    }
}