const Teacher = require('../../models/lol')



exports.show = async (req, res) => {
    let data = await Teacher.findById(req.query.idTeacher,{ group: { $elemMatch: { _id: req.query.idGroup } } })
    if (data) {
        res.json({ title: "Special group", data })
    }
}
exports.post = async(req,res)=>{
    req.body.data.map(async item=>{
        console.log(item.attendance);
       try{
        let user = await Teacher.findByIdAndUpdate(item.id,{
            $push:{
                attendance:{
                    date: item.attendance.date,
                    absend: Boolean(item.attendance.absend),
                    score: Number(item.attendance.score)
                }
            }
        })
        res.json(user)
       }catch(e){
        res.json({message:"ERROR",title:e})
       }
    })
}