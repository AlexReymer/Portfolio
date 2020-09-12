const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    title: String,
    status: String,
    short_desc: String,
    long_desc: String,
    tags: [String],
    link: String
}, { collection: 'Projects'})

const Project = mongoose.model('Restaurant', ProjectSchema);

module.exports = { Project };

export {}




