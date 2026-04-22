const express = require('express')
const Skill = require('../models/Skill')
const routes = express.Router();

routes.post('/addskill', async (req, res) => {
  try {
    const { skill, description } = req.body;
    const data = await Skill.findOne({ skill: skill });
    if (data) {
      return res.json({ msg: "Alrady Exits Skill" })
    }
    const Skilladd = await new Skill(req.body);
    Skilladd.save();
    res.json({ msg: "Data Save Successfully" })

  }


  catch (er) {
    console.log(er);
    res.json({ msg: "Invalid" })
  }
})
// GET: fetch all skills
routes.get('/skills/:id', async (req, res) => {
  try {
    const skills = await Skill.find({userId:req.params.id});
    res.json(skills);
  } catch (er) {
    console.log(er);
    res.status(500).json({ msg: "Error fetching skills" });
  }
});

// Optional: GET by id
routes.get('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ msg: "Skill not found" });
    res.json(skill);
  } catch (er) {
    console.log(er);
    res.status(500).json({ msg: "Error fetching skill" });
  }
});
routes.delete('/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ msg: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting skill" });
  }
});
// find skill by user id
routes.get('/getskill/:id', async (req, res) => {
  try {
    const data = await Skill.find({ userId: req.params.id })
    res.json({ msg: "Successfully get skills", data: data })
  }
  catch (er) {
    console.log(er);
    res.json({ msg: "Sorry try again" })

  }
})

module.exports = routes;