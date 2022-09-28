import { Router } from "express";
import {
  createClinics,
  deleteClinicByID,
  getClinicByID,
  getClinics,
  updateClinic,
} from "../models/clinics";

const clinicRouter = Router();

// Get all clinics
clinicRouter.get("/", (req, res) => {
  const clinics = getClinics();
  res.send(clinics);
});

// Get a clinic by ID
clinicRouter.get("/:id", (req, res) => {
  const clinic = getClinicByID(req.params.id);
  res.send(clinic);
});

// Create clinics
clinicRouter.post("/", (req, res) => {
  const body = req.body;
  const newClinic = createClinics(body);
  res.send({ id: newClinic.lastInsertRowid });
});

// Update clinic
clinicRouter.put("/:id", (req, res) => {
  const body = req.body;
  const updatedClinic = updateClinic(req.params.id, body);
  res.send(updatedClinic);
});

// Delete clinic
clinicRouter.delete("/:id", (req, res) => {
  const deletedClinic = deleteClinicByID(req.params.id);
  res.send(deletedClinic);
});

export default clinicRouter;
