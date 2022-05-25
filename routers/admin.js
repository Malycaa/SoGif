"use strict"

const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

const needLogin = function (req, res, next) {
    console.log('Time:' , Date.now())
    next()
}

router.get("/login", needLogin, adminController.login)
router.post("/login", needLogin, adminController.loginPost)

router.get("/alluser", adminController.alluser)

router.get("/alluser/edit/:profileId", adminController.editProfile)

router.post("/alluser/edit/:profileId", adminController.editProfilePost)

router.get("/alluser/view/:UserId", adminController.view)

router.get("/alluser/view/like/:postId", adminController.like)







module.exports = router 