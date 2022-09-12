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

patientRouter.get("/:id", (req, res) => {
  const patient = getPatientByID(req.params.id);
  res.send(patient);
});

patientRouter.post("/", (req, res) => {
  const body = req.body;
  const newPatient = createPatient(body);
  res.send({ id: newPatient.lastInsertRowid });
});

patientRouter.put("/:id", (req, res) => {
  const body = req.body;
  const updatedPatient = updatePatient(req.params.id, body);
  res.send(updatedPatient);
});

patientRouter.delete("/:id", (req, res) => {
  const deletedPatient = deletePatientByID(req.params.id);
  res.send(deletedPatient);
});

export default patientRouter;
