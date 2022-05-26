const { User, Post, Profile } = require("../models/index")

const bycrpt = require("bcryptjs")

const { changeDate } = require("../help/help")



class userController {
    static login(req, res) {
        res.render("loginUser.ejs")
    }

    static loginPost(req, res, next) {
        let { username, password } = req.body

        User.findOne({
            where: { username }
        })
            .then(user => {
                let id = user.id
                if (user && user.role === "user") {
                    let truePassword = bycrpt.compareSync(password, user.password)
                    if (truePassword) {
                        // console.log(id)
                        req.session.user = {
                            id:id
                        }
                        // console.log(req.session)
                        // localStorage.setItem('id', id)
                        
                        return res.redirect(`/user/post/${id}`)
                        // return res.redirect(`/user/post/${id}?id=`)
                    } else {
                        const error = "Invalid username/password"
                        return res.redirect(`/user/login?error=${error}`)
                    }
                } else {
                    return res.send(`anda bukan user`)
                }

            })
            .catch(err => {
                res.send(err)
            })
    }

    static showPost(req, res, next) {
        // console.log(req.params)
        let id = +req.params.id
        let result;
        Post.findAll({
            where: {
                UserId: id
            }
        })
        .then(post=>{
            result = post
            return Profile.findOne({
                where: {
                    UserId: id
                }
            })
        })//findall usernya gitu ya, nanti passing ke dalam thne dibawah//
            .then(temp => {
                console.log(temp)
                // console.log(result,'========')
                res.render('postUser.ejs', { temp, result, id, changeDate })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static like(req, res, next) {
        let id = +req.params.idPost
        // console.log(id)
        let temp
        Post.findByPk(id)
            .then(result => {
                temp = result
                // console.log(result)
                return Post.increment('like', {
                    where: {
                        id: id
                    }
                })
            })
            .then(result => {
                res.redirect(`/user/post/${temp.UserId}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static delete(req, res, next) {
        let id = +req.params.idPost
        let temp
        Post.findByPk(id)
            .then(result => {
                temp = result
                // console.log(result)
                return Post.destroy({
                    where: {
                        id: id
                    }
                })
            })
            .then(result => {
                res.redirect(`/user/post/${temp.UserId}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static addPost(req, res, next) {
        let id = req.params.userId
        let errors = {}
        res.render('formAddPost.ejs', { id, errors })
    }

    static postAddPost(req, res) {
        let UserId = +req.params.userId
        let { imageURL, caption } = req.body
        let like = 0
        let id = {}

        Post.create({ imageURL, like, UserId, caption })
            .then(result => {
                res.redirect(`/user/post/${UserId}`)
            })
            .catch(err => {
                const errors = {}

                err.errors.forEach(x => {
                    if (errors[x.path]) {
                        errors[x.path].push(x.message)
                    } else {
                        errors[x.path] = x.message
                    }
                })
                res.render('formAddPost.ejs', { errors, id })

            })

    }


}

module.exports = userController