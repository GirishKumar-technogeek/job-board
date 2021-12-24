const express = require('express')
const path = require('path');
const router = express.Router()
const Job = require('../models/jobsModel')

router.get('/', async(req,res) => {
    try{
        res.sendFile(path.join(__dirname, '/views/jsindex.html'))
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/seejobs',async(req,res) => {
    try{
        const jobs = await Job.find()
        res.json(jobs)
    }catch(err){
        res.send('Error ' + err)
    }
})

module.exports = router