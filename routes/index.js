const express = require('express')
const {ensureAuth,ensureGuest} = require('../middleware/auth')
const router = express.Router()

// @desc Login/Landing page
// @route GET /

router.get('/',ensureGuest, (req,res) => {
    res.render('Login',{
        layout:'login'
    })
})


// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard',ensureAuth,(req,res) => {
    res.render('Dashboard')
})
module.exports = router 