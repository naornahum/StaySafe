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

vaccineRouter.get("/:id", (req, res) => {
  const vaccine = getVaccineByID(req.params.id);
  res.send(vaccine);
});

vaccineRouter.post("/", (req, res) => {
  const body = req.body;
  const newVaccine = createVaccines(body);
  res.send({ id: newVaccine.lastInsertRowid });
});

vaccineRouter.put("/:id", (req, res) => {
  const body = req.body;
  const updatedVaccine = updateVaccine(req.params.id, body);
  res.send(updatedVaccine);
});

vaccineRouter.delete("/:id", (req, res) => {
  const deletedVaccine = deleteVaccineByID(req.params.id);
  res.send(deletedVaccine);
});

export default vaccineRouter;
