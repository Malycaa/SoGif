"use strict"

const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { needLogin } = require("../help/help")



router.get("/login", userController.login)

router.post("/login", userController.loginPost)
router.use(needLogin)


router.get("/post/:id", userController.showPost)

router.get("/like/:idPost", userController.like)

router.get("/delete/:idPost", userController.delete)

router.get("/add/:userId", userController.addPost)

router.post("/add/:userId", userController.postAddPost)






module.exports = router 