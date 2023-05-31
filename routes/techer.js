const{Router} = require('express');

const router = Router()

router.use('/group',require("./techer/group"))
router.use('/auth',require("./auth"))
router.use('/profile',require("./techer/teacher"))
router.use('/',require("./techer/index"))

module.exports = router