import { Router } from "express";
import {
  createVaccines,
  deleteVaccineByID,
  getVaccineByID,
  getVaccines,
  updateVaccine,
} from "../models/vaccines";

const vaccineRouter = Router();

// Get all vaccines
vaccineRouter.get("/", (req, res) => {
  const vaccines = getVaccines();
  res.send(vaccines);
});

// Get a vaccine by ID
vaccineRouter.get("/:id", (req, res) => {
  const vaccine = getVaccineByID(req.params.id);
  res.send(vaccine);
});

// Create vaccines
vaccineRouter.post("/", (req, res) => {
  const body = req.body;
  const newVaccine = createVaccines(body);
  res.send({ id: newVaccine.lastInsertRowid });
});

// Update vaccine
vaccineRouter.put("/:id", (req, res) => {
  const body = req.body;
  const updatedVaccine = updateVaccine(req.params.id, body);
  res.send(updatedVaccine);
});

// Delete vaccine
vaccineRouter.delete("/:id", (req, res) => {
  const deletedVaccine = deleteVaccineByID(req.params.id);
  res.send(deletedVaccine);
});

export default vaccineRouter;
