const{Router} = require('express');

const router = Router()

router.use('/',require("./admin/index"))
router.use('/auth',require("./auth"))
router.use('/teachers',require("./admin/teachers"))
router.use('/groups',require("./admin/groups"))
router.use('/students',require("./admin/students"))

module.exports = router