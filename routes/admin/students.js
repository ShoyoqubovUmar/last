const{Router} = require('express');

const {
    index, 
    create,
    show,
    remove,
    edit,
    addStudentToGroup,
    removeStudentFromGroup
} = require('../../controllers/admin/students');
const router = Router()

router.post('/manage', addStudentToGroup)
router.delete('/manage', removeStudentFromGroup)

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.delete('/:id', remove)
router.put('/:id', edit)

module.exports = router