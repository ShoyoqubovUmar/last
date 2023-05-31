const{Router} = require('express');

const router = Router()

router.use('/auth',require("./auth"))
router.use('/',require("./student/index"))

module.exports = router