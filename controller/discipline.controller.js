const { Discipline } = require("../models/discipline.model");

// Create a new discipline
async function createDiscipline(req, res, next) {
  try {
    const newDiscipline = new Discipline(req.body);
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

// Update a discipline
async function updateDiscipline(req, res, next) {
  const disciplineId = req.params.disciplineId;
  const isDisciplineExists = await Discipline.findById(disciplineId);

  if (!isDisciplineExists) {
    return res.status(404).send({
      error: true,
      message: "Discipline is not found.",
    });
  }

  try {
    await Discipline.findByIdAndUpdate(req.params.disciplineId, req.body, {
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
  const disciplineId = req.params.disciplineId;
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
  updateDiscipline,
  deleteDiscipline,
};
