const express = require('express')
const {ensureAuth,ensureGuest} = require('../middleware/auth')
const router = express.Router()
const Story = require('../models/Story')
// @desc Login/Landing page
// @route GET /

router.get('/',ensureGuest, (req,res) => {
    res.render('Login',{
        layout:'login'
    })
})


// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard',ensureAuth, async (req,res) => {
    try {
        // const stories = await Story.find({user:req.user.id}).lean()
        // const stories = await Story.find({ user: req.user.id }).lean()
        const stories = await Story.find().lean()
        console.log(req.user.id)
        console.log(stories)
        res.render('Dashboard',{
            name:req.user.firstName,
            stories
        })
    } catch(err){
        console.error(err)
        res.render('error/500')
    }
    
})
router.get('/stories/add',ensureAuth,async (req,res) => {
    try{
        res.render('stories/add')
    }
    catch(err) {
        console.error(err)
        res.render('error/500')
    }
})
router.post('/stories/adds/',ensureAuth,async (req,res) => {
    try{
        req.body.user = req.user.id
        console.log(req.body)
        console.log("posted")
        console.log(req.user.id)
        await Story.create()
        res.redirect('/dashboard')
    }
    catch(err){
        console.error(err)
        res.render('error/500')
    }
})
router.get('/stories',ensureAuth, async  (req,res) => {
    try{
        console.log("hey")
        const stories = Story.find().lean()
        console.log(stories)
    }
    catch(err){
        console.error(err)
        res.render('error/500')
    }
})
router.get('/stories/:id',ensureAuth,async (req,res) => {
    try{
        console.log("hey")
        const story = await Story.findOne({
            _id:req.params.id
        })
        console.log(story)
        res.render('stories/story',{
            story
        })
    }
    catch(err){
        console.error(err)
        res.render('error/500')
    }
})
module.exports = router 