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
  const nurses = getNurses();
  res.send(nurses);
});

// Get a nurse by ID
nurseRouter.get("/:id", (req, res) => {
  const nurse = getNurseByID(req.params.id);
  res.send(nurse);
});

// Create nurses
nurseRouter.post("/", (req, res) => {
  const body = req.body;
  const newNurse = createNurses(body);
  res.send({ id: newNurse.lastInsertRowid });
});

// Update nurse
nurseRouter.put("/:id", (req, res) => {
  const body = req.body;
  console.log(body);

  // const currentNurse = getNurseByID(req.params.id)[0];

  // if (body.location_id && currentNurse.location_id !== body.location_id) {
  //   // Update old location history depurture date
  //   // Create new location history with depurtuel date empty
  //   const newLocationHistory = {
  //     arrival_date: getCurrentDate(),
  //     departure_date: null,
  //     nurse_id: req.params.id,
  //     location_id: body.location_id,
  //   };
  //   createLocationHistory(newLocationHistory);
  // }
  const updatedNurse = updateNurse(req.params.id, body);
  res.send(updatedNurse);
});

// Delete nurse
nurseRouter.delete("/:id", (req, res) => {
  const deletedNurse = deleteNurseByID(req.params.id);
  res.send(deletedNurse);
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
