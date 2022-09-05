import { Router } from "express";
import {
  deleteLocationHistoryByID,
  getLocationHistoryByID,
  getLocationsHistory,
} from "../models/location_history";

const locationHistoryRouter = Router();

// Get all the locations
locationHistoryRouter.get("/", (req, res) => {
  const locationsHistory = getLocationsHistory();
  res.send(locationsHistory);
});

locationHistoryRouter.get("/:id", (req, res) => {
  const locationHistory = getLocationHistoryByID(req.params.id);
  res.send(locationHistory);
});

locationHistoryRouter.delete("/:id", (req, res) => {
  const deletedlocationsHistory = deleteLocationHistoryByID(req.params.id);
  res.send(deletedlocationsHistory);
});

export default locationHistoryRouter;
