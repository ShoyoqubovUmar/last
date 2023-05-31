const Teacher = require('../../models/lol')

exports.index = async (req, res) => {
    let { idTeacher,} = req.query
    console.log(idTeacher);
    let data = await Teacher.findById(idTeacher, ["group"])
    if (data) {
        res.json({ title: "All group", data })
    }
}