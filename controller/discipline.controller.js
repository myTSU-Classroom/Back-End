const { Discipline } = require("../models/discipline.model");
const mongoose = require("mongoose");

// Create a new discipline
async function createDiscipline(req, res, next) {
  try {
    const teacherId = new mongoose.Types.ObjectId(req.body.teacherId);
    const groupId = new mongoose.Types.ObjectId(req.body.groupId);

    const newDiscipline = new Discipline({
      discipline: req.body.disciplineName,
      description_plainContent: req.body.description_plainContent,
      description_htmlContent: req.body.description_htmlContent,
      year: req.body.year,
      grade: req.body.grade,
      readingAndLiterature_plainContent:
        req.body.readingAndLiterature_plainContent,
      readingAndLiterature_htmlContent:
        req.body.readingAndLiterature_htmlContent,
      groupId: groupId,
      teacherId: teacherId,
      method: req.body.method,
      building: req.body.building,
      room: req.body.room,
      dayOfWeek: req.body.dayOfWeek,
      startTime: req.body.startTime,
      finishTime: req.body.finishTime,
    });

    await newDiscipline.save();
    res.status(201).send({
      error: false,
      message: "Discipline has been saved successfully.",
    });
  } catch (err) {
    return res.status(500).send({
      error: false,
      message: err.message,
    });
  }
}

// Read all disciplines
async function getAllDiscipline(req, res, next) {
  try {
    const discipline = await Discipline.find();

    if (discipline.length === 0) {
      return res.status(404).json({
        error: true,
        message: "There is no discipline found.",
      });
    }
    return res.status(200).json(discipline);
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }
}

// Update a discipline
async function updateDiscipline(req, res, next) {
  const disciplineId = req.body.disciplineId;
  const isDisciplineExists = await Discipline.findById(disciplineId);

  if (!isDisciplineExists) {
    return res.status(404).send({
      error: true,
      message: "Discipline is not found.",
    });
  }

  try {
    const teacherId = new mongoose.Types.ObjectId(req.body.teacherId);
    const groupId = new mongoose.Types.ObjectId(req.body.groupId);

    const updatedDiscipline = {
      discipline: req.body.disciplineName,
      description: req.body.description,
      year: req.body.year,
      grade: req.body.grade,
      readingAndLiterature: req.body.readingAndLiterature,
      groupId: groupId,
      teacherId: teacherId,
      method: req.body.method,
      dayOfWeek: req.body.dayOfWeek,
      startTime: req.body.startTime,
      finishTime: req.body.finishTime,
    };

    if (req.body.method === "Online") {
      updatedDiscipline.building = null;
      updatedDiscipline.room = null;
    } else {
      updatedDiscipline.building = req.body.building;
      updatedDiscipline.room = req.body.room;
    }

    await Discipline.findByIdAndUpdate(disciplineId, updatedDiscipline, {
      new: true,
    });

    return res.status(200).send({
      error: false,
      message: "Discipline has been updated successfully.",
    });
  } catch (err) {
    return res.status(500).send({
      error: false,
      message: err.message,
    });
  }
}

// Delete a discipline
async function deleteDiscipline(req, res, next) {
  const disciplineId = req.body.disciplineId;
  const isDisciplineExists = await Discipline.findById(disciplineId);

  if (!isDisciplineExists) {
    return res.status(404).send({
      error: true,
      message: "Discipline is not found.",
    });
  }

  try {
    await Discipline.findByIdAndDelete(disciplineId);

    return res.status(200).send({
      error: false,
      message: "Discipline has been deleted successfully.",
    });
  } catch (err) {
    return res.status(500).send({
      error: false,
      message: err.message,
    });
  }
}

module.exports = {
  createDiscipline,
  getAllDiscipline,
  updateDiscipline,
  deleteDiscipline,
};
