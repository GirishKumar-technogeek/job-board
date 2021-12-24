const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({

    job_title: {
        type: String,
        required: true
    },
    job_location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    no_of_positions: {
        type: Number,
        required: true,
        default: false
    },
    contact_email: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('jobsSchema',jobsSchema)