const{Router} = require('express');

const {
    // index, 
    // create,
    show,
    post,
    // edit
} = require('../../controllers/techer/group');
const router = Router()

// router.get('/', index)
router.get('/', show)
// router.post('/', create)
router.post('/', post)
// router.put('/', edit)

module.exports = router