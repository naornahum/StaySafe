"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const location_history_1 = require("../models/location_history");
const locationHistoryRouter = (0, express_1.Router)();
// Get all the locations
locationHistoryRouter.get("/", (req, res) => {
    const locationsHistory = (0, location_history_1.getLocationsHistory)();
    res.send(locationsHistory);
});
locationHistoryRouter.get("/:id", (req, res) => {
    const locationHistory = (0, location_history_1.getLocationHistoryByID)(req.params.id);
    res.send(locationHistory);
});
locationHistoryRouter.delete("/:id", (req, res) => {
    const deletedlocationsHistory = (0, location_history_1.deleteLocationHistoryByID)(req.params.id);
    res.send(deletedlocationsHistory);
});
exports.default = locationHistoryRouter;
