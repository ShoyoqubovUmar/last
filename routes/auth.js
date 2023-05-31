const {Router} = require("express");
const { checkLogin } = require("../middleware/checkLogin");
const { signUp, signIn } = require("../controllers/auth");
const router = Router()

router.route("/")
    .post(checkLogin,signUp)
    .get(checkLogin,signIn)
module.exports = router