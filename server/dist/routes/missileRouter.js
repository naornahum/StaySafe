"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const location_history_1 = require("../models/location_history");
const missiles_1 = require("../models/missiles");
const missileRouter = (0, express_1.Router)();
// Get all missiles
missileRouter.get("/", (req, res) => {
    const missiles = (0, missiles_1.getMissiles)();
    res.send(missiles);
});
missileRouter.get("/:id", (req, res) => {
    const missile = (0, missiles_1.getMissileByID)(req.params.id);
    res.send(missile);
});
missileRouter.post("/", (req, res) => {
    const body = req.body;
    const newMissile = (0, missiles_1.createMissiles)(body);
    res.send({ id: newMissile.lastInsertRowid });
});
missileRouter.put("/:id", (req, res) => {
    const body = req.body;
    console.log(body);
    const currentMissile = (0, missiles_1.getMissileByID)(req.params.id)[0];
    if (body.location_id && currentMissile.location_id !== body.location_id) {
        // Update old location history depurture date
        // Create new location history with depurtuel date empty
        const newLocationHistory = {
            arrival_date: getCurrentDate(),
            departure_date: null,
            missile_id: req.params.id,
            location_id: body.location_id,
        };
        (0, location_history_1.createLocationHistory)(newLocationHistory);
    }
    const updatedMissile = (0, missiles_1.updateMissile)(req.params.id, body);
    res.send(updatedMissile);
});
missileRouter.delete("/:id", (req, res) => {
    const deletedMissile = (0, missiles_1.deleteMissileByID)(req.params.id);
    res.send(deletedMissile);
});
function getCurrentDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return dd + "/" + mm + "/" + yyyy;
}
exports.default = missileRouter;
