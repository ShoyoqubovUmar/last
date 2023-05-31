const{Router} = require('express');

const {
    index
} = require('../../controllers/student/index')
const router = Router()

router.get('/', index)

module.exports = router