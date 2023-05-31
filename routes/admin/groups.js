const{Router} = require('express');

const {
    index, 
    create,
    show,
    remove,
    edit
} = require('../../controllers/admin/groups');
const router = Router()

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.delete('/', remove)
router.put('/', edit)

module.exports = router