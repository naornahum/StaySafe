import { Router } from "express";
import {
  createOfficer,
  deleteOfficerByID,
  getOfficerByID,
  getOfficers,
  updateOfficer,
} from "../models/officers";

const officerRouter = Router();

// Get all officers
officerRouter.get("/", (req, res) => {
  const officers = getOfficers();
  res.send(officers);
});

officerRouter.get("/:id", (req, res) => {
  const officer = getOfficerByID(req.params.id);
  res.send(officer);
});

officerRouter.post("/", (req, res) => {
  const body = req.body;
  const newOfficer = createOfficer(body);
  res.send({ id: newOfficer.lastInsertRowid });
});

officerRouter.put("/:id", (req, res) => {
  const body = req.body;
  const updatedOfficer = updateOfficer(req.params.id, body);
  res.send(updatedOfficer);
});

officerRouter.delete("/:id", (req, res) => {
  const deletedOfficer = deleteOfficerByID(req.params.id);
  res.send(deletedOfficer);
});

export default officerRouter;
