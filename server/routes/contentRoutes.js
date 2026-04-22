const express = require('express')
const routes = express.Router()
const Content = require('../models/Content')
const path = require('path')
const multer = require('multer')
const { log } = require('console')
const upload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join("./public/uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const uploadFile = multer({ storage: upload })
routes.post('/upload', uploadFile.single('content'), async (req, res) => {
    try {
        const { skillId, content, userId } = req.body;
        const data = await new Content({
            skillId: skillId,
            file: req.file.path,
            userId: userId
        })
        data.save();
        res.json({ msg: "Content upload successfully" })
    }
    catch (er) {
        console.log(er);
        res.json({ msg: "server error." })
    }
})
routes.post('/search', async (req, res) => {
    const { technology } = req.body;

    try {
        const contents = await Content.find().populate('skillId').populate('userId');

        const result = contents.filter(item => 
            item.skillId.skill.toLowerCase() === technology.toLowerCase()
        );

        res.json({ msg: result });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = routes
