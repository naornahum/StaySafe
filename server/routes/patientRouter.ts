import { Router } from "express";
import {
  createPatient,
  deletePatientByID,
  getPatientByID,
  getPatients,
  updatePatient,
} from "../models/patients";

const patientRouter = Router();

// Get all patients
patientRouter.get("/", (req, res) => {
  const patients = getPatients();
  res.send(patients);
});

// Get a patient by ID
patientRouter.get("/:id", (req, res) => {
  const patient = getPatientByID(req.params.id);
  res.send(patient);
});

// Create patient
patientRouter.post("/", (req, res) => {
  const body = req.body;
  const newPatient = createPatient(body);
  res.send({ id: newPatient.lastInsertRowid });
});

// Update patient
patientRouter.put("/:id", (req, res) => {
  const body = req.body;
  const updatedPatient = updatePatient(req.params.id, body);
  res.send(updatedPatient);
});

// Delete patient
patientRouter.delete("/:id", (req, res) => {
  const deletedPatient = deletePatientByID(req.params.id);
  res.send(deletedPatient);
});

export default patientRouter;
