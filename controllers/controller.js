const { User, Profile } = require("../models/index")
var nodemailer = require('nodemailer');

const bycrpt = require("bcryptjs")
const profile = require("../models/profile")


class Controller {
    static home(req, res, next) {
        res.render(`home.ejs`)
    }

    static register(req, res, next) {
        let errors = {}
        res.render("register.ejs", { errors })
    }

    static registerPost(req, res, next) {
        let { username, password, email, role, name, bio, gender, UserId } = req.body

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'randychan35@gmail.com',
                pass: 'ehvdovnblfkpenzy'
            }
        });

        var mailOptions = {
            from: 'randychan35@gmail.com',
            to: email,
            subject: 'INSTATON Pair Project',
            text: `HAI ${name}, Terima Kasih telah mendaftar.`
        };
        // console.log('masukk 11111');
        User.create({ username, password, email, role }, {
            returning: true
        })
            .then(result => {
                // console.log('masukk 22222');

                const id = result.id
                if (role === "user") {
                // console.log('masukk 3333');

                    return Profile.create({ name, bio, gender, UserId: id })
                        .then(result => {
                            // console.log('masukk 4444');

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log("erorrr cuk!!");
                                    console.log(error);
                                } else {
                                    console.log("jalan cuk!!");

                                    return res.redirect(`/user/login`)
                                }
                            });
                                    // return res.redirect(`/user/login`)

                        })
                        .catch(err => {
                            if (err.name === 'SequelizeValidationError') {
                                let tempErr = err.errors.map((el) => {
                                    return el.message
                                })
                                return res.redirect(`/register?errors=${tempErr}`)
                            }
                            res.send(err)
                        })
                } 
                if (role === "admin") {
                    return Profile.create({ name, bio, gender, UserId: id })
                        .then(result => {
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    return res.redirect(`/admin/login`)
                                }
                            });
                        })
                        .catch(err => {
                            res.send(errors)

                        })
                }
            })

    }

    static login(req, res, next) {
        res.render("login.ejs")
    }
}

module.exports = Controller