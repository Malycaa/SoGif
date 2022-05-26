"use strict"

const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const { needLogin } = require("../help/help")



router.get("/login", adminController.login)
router.post("/login", adminController.loginPost)

router.use(needLogin)


router.get("/alluser", adminController.alluser)

router.get("/alluser/edit/:profileId", adminController.editProfile)

router.post("/alluser/edit/:profileId", adminController.editProfilePost)

router.get("/alluser/view/:UserId", adminController.view)

router.get("/alluser/view/like/:postId", adminController.like)







module.exports = router 