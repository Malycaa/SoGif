function changeDate(value){
    return new Date(value).toLocaleDateString()
}


// const needLogin = (req, res, next) =>{
//     if(!req.session.UserId)
// }

module.exports = { changeDate }




