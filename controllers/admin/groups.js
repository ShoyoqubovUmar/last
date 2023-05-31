const Teacher = require('../../models/lol')

exports.index = async (req, res) => {
    try{
        let { idTeacher } = req.query
        console.log(idTeacher);
        let data = await Teacher.findById(idTeacher, ["group"])
        if (data) {
            res.json({ title: "Teacher`s All group", data })
        }
    }catch(e){
        res.json({ title: "ERROR", e })
    }
}
exports.show = async (req, res) => {
    let data = await Teacher.findById(req.query.idTeacher).select({ group: { elemMatch: { _id: req.params.id } } })
    if (data) {
        res.json({ title: "Teacher`s Special group", data })
    }
}
exports.create = async (req, res) => {
    let { title, day, time } = req.body
    let { idTeacher } = req.query
    try {
        let idTeacherCheck = await Teacher.findById(idTeacher)
        if (title && day && time) {
            console.log(title, day, time, idTeacher);

            let data = await Teacher.findByIdAndUpdate(idTeacher, { $push: { group: req.body } })
            if (data) {
                res.json({ title: 'Group added to teacher', data })
            } else {
                res.json({ title: 'xatolik !!!' })
            }
        } else {
            res.json({ title: 'malumot toliq kiritilmagan' })
        }
    } catch (e) {
        res.json({ title: 'err', e })
    }
    console.log(idTeacherCheck);
}
exports.remove = async (req, res) => {
    if (req.query.idTeacher && req.query.idGroup) {
        let data = await Teacher.findByIdAndUpdate(req.query.idTeacher, { $pull: { group: { _id: req.query.idGroup } } })
        if (data) {
            res.json({ title: "Group deleted", data })
        }
    } else {
        res.json({ title: "ERROR", desc: "bunday oqtivuchi mavjud emas" })
    }
}
exports.edit = async (req, res) => {
    let { title, day, time } = req.body
    let { idGroup, idTeacher } = req.query
    if (idTeacher && idGroup) {
        if (title || day || time) {
            let data = await Teacher.findOneAndUpdate(
                {
                    _id: idTeacher,
                    "group._id": idGroup
                },
                {
                    $set: {
                        "group.$": { ...req.body, _id: idGroup }
                    }
                }
            )
            res.json({ title: "Group Updated", data })
        } else {
            res.json({ title: "ERROR", desc: "bunday oqtivuchi mavjud emas" })
        }
    }
}