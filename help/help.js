function changeDate(value){
    return new Date(value).toLocaleDateString()
}


const needLogin = (req, res, next) =>{
    // req.session.user = {
    //     id:id
    // }
    console.log(req.session);
    if(!req.session.user){
        // let error = ('jgn by pass')
        res.redirect('/user/login')
    }else{
        next()//lanjut
    }
}

module.exports = { changeDate , needLogin}




