"use strict"

const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const session = require('express-session')


const needLogin = function (req, res, next) {
    if(!req.session.id){
        res.redirect('/')
    } else {
        next()
    }
}

router.get("/login", userController.login)
router.post("/login", userController.loginPost)

router.use(needLogin)

router.get("/post/:id", userController.showPost)

router.get("/like/:idPost", userController.like)

router.get("/delete/:idPost", userController.delete)

router.get("/add/:userId", userController.addPost)

router.post("/add/:userId", userController.postAddPost)






module.exports = router 