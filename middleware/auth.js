module.exports = {
    ensureAuth:function (req,res,next) {
        if(req.isAuthenticated()){
            return next()
        } else{
            res.redirect('/')
        }
    },
    ensureGuest:function(req,res,next){
        console.log("Ypu are authenticated")
        if (req.isAuthenticated()){
            res.redirect('/dashboard')
        }
        else{
            return next()
        }
    }
}