import { Router } from "express";
import {
  createNurses,
  deleteNurseByID,
  getNurseByID,
  getNurses,
  updateNurse,
} from "../models/nurses";

const nurseRouter = Router();

// Get all nurses
nurseRouter.get("/", (req, res) => {
  const missiles = getNurses();
  res.send(missiles);
});

nurseRouter.get("/:id", (req, res) => {
  const missile = getNurseByID(req.params.id);
  res.send(missile);
});

nurseRouter.post("/", (req, res) => {
  const body = req.body;
  const newMissile = createNurses(body);
  res.send({ id: newMissile.lastInsertRowid });
});

nurseRouter.put("/:id", (req, res) => {
  const body = req.body;
  console.log(body);
  const currentMissile = getNurseByID(req.params.id)[0];

  // if (body.location_id && currentMissile.location_id !== body.location_id) {
  //   // Update old location history depurture date
  //   // Create new location history with depurtuel date empty
  //   const newLocationHistory = {
  //     arrival_date: getCurrentDate(),
  //     departure_date: null,
  //     missile_id: req.params.id,
  //     location_id: body.location_id,
  //   };
  //   createLocationHistory(newLocationHistory);
  // }
  const updatedMissile = updateNurse(req.params.id, body);
  res.send(updatedMissile);
});

nurseRouter.delete("/:id", (req, res) => {
  const deletedMissile = deleteNurseByID(req.params.id);
  res.send(deletedMissile);
});

// function getCurrentDate() {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   let mm: any = today.getMonth() + 1; // Months start at 0!
//   let dd: any = today.getDate();

//   if (dd < 10) {
//     dd = "0" + dd;
//   }
//   if (mm < 10) {
//     mm = "0" + mm;
//   }

//   return dd + "/" + mm + "/" + yyyy;
// }

export default nurseRouter;
