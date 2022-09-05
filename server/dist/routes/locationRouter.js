"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locations_1 = require("../models/locations");
const locationRouter = (0, express_1.Router)();
// Get all the locations
locationRouter.get("/", (req, res) => {
    const locations = (0, locations_1.getLocations)();
    res.send(locations);
});
locationRouter.get("/:id", (req, res) => {
    const location = (0, locations_1.getLocationByID)(req.params.id);
    res.send(location);
});
locationRouter.post("/", (req, res) => {
    const body = req.body;
    const newLocation = (0, locations_1.createLocation)(body);
    res.send({ id: newLocation.lastInsertRowid });
});
locationRouter.put("/:id", (req, res) => {
    const body = req.body;
    const updatedLocation = (0, locations_1.updateLocation)(req.params.id, body);
    res.send(updatedLocation);
});
locationRouter.delete("/:id", (req, res) => {
    const deletedLocation = (0, locations_1.deleteLocationByID)(req.params.id);
    res.send(deletedLocation);
});
exports.default = locationRouter;
