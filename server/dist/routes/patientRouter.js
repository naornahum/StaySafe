"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_1 = require("../models/patients");
const patientRouter = (0, express_1.Router)();
// Get all patients
patientRouter.get("/", (req, res) => {
    const patients = (0, patients_1.getPatients)();
    res.send(patients);
});
patientRouter.get("/:id", (req, res) => {
    const patient = (0, patients_1.getPatientByID)(req.params.id);
    res.send(patient);
});
patientRouter.post("/", (req, res) => {
    const body = req.body;
    const newPatient = (0, patients_1.createPatient)(body);
    res.send({ id: newPatient.lastInsertRowid });
});
patientRouter.put("/:id", (req, res) => {
    const body = req.body;
    const updatedPatient = (0, patients_1.updatePatient)(req.params.id, body);
    res.send(updatedPatient);
});
patientRouter.delete("/:id", (req, res) => {
    const deletedPatient = (0, patients_1.deletePatientByID)(req.params.id);
    res.send(deletedPatient);
});
exports.default = patientRouter;
