import { Router } from "express";
import { getLocationByID } from "../models/locations";
import { createLocationHistory, getLocationHistoryByID } from "../models/location_history";
import {
  createMissiles,
  deleteMissileByID,
  getMissileByID,
  getMissiles,
  updateMissile,
} from "../models/missiles";

const missileRouter = Router();

// Get all missiles
missileRouter.get("/", (req, res) => {
  const missiles = getMissiles();
  res.send(missiles);
});

missileRouter.get("/:id", (req, res) => {
  const missile = getMissileByID(req.params.id);
  res.send(missile);
});

missileRouter.post("/", (req, res) => {
  const body = req.body;
  const newMissile = createMissiles(body);
  res.send({ id: newMissile.lastInsertRowid });
});

missileRouter.put("/:id", (req, res) => {
  const body = req.body;
  console.log(body);
  const currentMissile = getMissileByID(req.params.id)[0];

  if (body.location_id && currentMissile.location_id !== body.location_id) {
    // Update old location history depurture date
    // Create new location history with depurtuel date empty
    const newLocationHistory = {
      arrival_date: getCurrentDate(),
      departure_date: null,
      missile_id: req.params.id,
      location_id: body.location_id,
    };
    createLocationHistory(newLocationHistory);
  }
  const updatedMissile = updateMissile(req.params.id, body);
  res.send(updatedMissile);
});

missileRouter.delete("/:id", (req, res) => {
  const deletedMissile = deleteMissileByID(req.params.id);
  res.send(deletedMissile);
});

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return dd + "/" + mm + "/" + yyyy;
}

export default missileRouter;
