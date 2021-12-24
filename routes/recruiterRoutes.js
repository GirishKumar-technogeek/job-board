const express = require('express')
const path = require('path');
const router = express.Router()
const Job = require('../models/jobsModel')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const xlsxFile = require('read-excel-file/node');

router.use(fileUpload({
    createParentPath: true
}));
router.use(cors());
router.use(bodyParser.json());
router.use(express.urlencoded())
router.use(express.json())

router.get('/', async(req,res) => {
    try{
        res.sendFile(path.join(__dirname, '/views/rcindex.html'))
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/alljobs',async(req,res) => {
    try{
        const jobs = await Job.find()
        res.json(jobs)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/postjob', async(req,res) => {
    try{
        res.sendFile(path.join(__dirname, '/views/postjob.html'))
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/postjob',async(req,res)=>{
    const job = new Job({
        job_title : req.body.job_title,
        job_location : req.body.job_location,
        salary : req.body.salary,
        no_of_positions : parseInt(req.body.no_of_positions),
        contact_email : req.body.contact_email
    })

    try{
        const j =  await job.save()
        res.redirect('/recruiters')
    }catch(err){
        res.send(err)
    }
})

router.get('/bulk-upload', async(req,res) => {
    try{
        res.sendFile(path.join(__dirname, '/views/bulk-upload.html'))
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/bulk-upload', function(req, res) {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let File = req.files.File;
            File.mv('./uploads/' + File.name);
            jobs = []
            xlsxFile('./uploads/' + File.name).then((rows) => {
                for(i=1;i<rows.length;i++){
                    var data = rows[i];
                    jobs.push({'job_title':data[0],'job_location':data[1],'salary':data[2],'no_of_positions':data[3],'contact_email':data[4]})
                }
                var job = Job.insertMany(jobs)
                res.redirect('/recruiters')
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/getjob/:id',async(req,res)=>{
    try{
        const job = await Job.findById(req.params.id) 
        res.json(job)   
    }catch(err){
        res.send('Error')
    }
})

router.get('/editjob/:id',async(req,res)=>{
    try{
        res.sendFile(path.join(__dirname, '/views/editjob.html'))
    }catch(err){
        res.send('Error')
    }
})

router.post('/editjob/:id',async(req,res)=>{
    try{
        const job = await Job.findById(req.params.id) 
        job.job_title = req.body.job_title
        job.job_location = req.body.job_location
        job.salary = req.body.salary
        job.no_of_positions = req.body.no_of_positions
        job.contact_email = req.body.contact_email
        const j =  await job.save()
        res.redirect('/recruiters')
    }catch(err){
        res.send('Error')
    }
})

router.get('/deletejob/:id',async(req,res) => {
    try{
        const job = await Job.findById(req.params.id) 
        const j =  await job.delete()
        res.redirect('/recruiters')
    }catch(err){
        res.send('Error')
    }
})

module.exports = router