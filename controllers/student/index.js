const Student = require('../../models/lol')
exports.index = async(req,res)=>{
    let data = await Student.find({}).sort({score:-1}).limit(2) 
    res.json(data)
}