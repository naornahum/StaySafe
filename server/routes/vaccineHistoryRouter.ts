import { Router } from "express";
import {
  deleteVaccineHistoryByID,
  getVaccineHistoryByID,
  getVaccinesHistory,
} from "../models/vaccine_history";

const vaccineHistoryRouter = Router();

// Get all Vaccines History
vaccineHistoryRouter.get("/", (req, res) => {
  const vaccinesHistory = getVaccinesHistory();
  res.send(vaccinesHistory);
});

// Get a Vaccine History by ID
vaccineHistoryRouter.get("/:id", (req, res) => {
  const vaccineHistory = getVaccineHistoryByID(req.params.id);
  res.send(vaccineHistory);
});

// Delete Vaccine History
vaccineHistoryRouter.delete("/:id", (req, res) => {
  const deletedVaccineHistory = deleteVaccineHistoryByID(req.params.id);
  res.send(deletedVaccineHistory);
});

export default vaccineHistoryRouter;
