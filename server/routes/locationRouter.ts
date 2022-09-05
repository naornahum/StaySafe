import { Router } from "express";
import {
  deleteLocationByID,
  getLocationByID,
  getLocations,
  createLocation,
  updateLocation,
} from "../models/locations";

const locationRouter = Router();

// Get all the locations
locationRouter.get("/", (req, res) => {
  const locations = getLocations();
  res.send(locations);
});

locationRouter.get("/:id", (req, res) => {
  const location = getLocationByID(req.params.id);
  res.send(location);
});

locationRouter.post("/", (req, res) => {
  const body = req.body;
  const newLocation = createLocation(body);
  res.send({ id: newLocation.lastInsertRowid });
});

locationRouter.put("/:id", (req, res) => {
  const body = req.body;
  const updatedLocation = updateLocation(req.params.id, body);
  res.send(updatedLocation);
});

locationRouter.delete("/:id", (req, res) => {
  const deletedLocation = deleteLocationByID(req.params.id);
  res.send(deletedLocation);
});

export default locationRouter;
