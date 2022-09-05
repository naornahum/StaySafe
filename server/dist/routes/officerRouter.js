"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const officers_1 = require("../models/officers");
const officerRouter = (0, express_1.Router)();
// Get all officers
officerRouter.get("/", (req, res) => {
    const officers = (0, officers_1.getOfficers)();
    res.send(officers);
});
officerRouter.get("/:id", (req, res) => {
    const officer = (0, officers_1.getOfficerByID)(req.params.id);
    res.send(officer);
});
officerRouter.post("/", (req, res) => {
    const body = req.body;
    const newOfficer = (0, officers_1.createOfficer)(body);
    res.send({ id: newOfficer.lastInsertRowid });
});
officerRouter.put("/:id", (req, res) => {
    const body = req.body;
    const updatedOfficer = (0, officers_1.updateOfficer)(req.params.id, body);
    res.send(updatedOfficer);
});
officerRouter.delete("/:id", (req, res) => {
    const deletedOfficer = (0, officers_1.deleteOfficerByID)(req.params.id);
    res.send(deletedOfficer);
});
exports.default = officerRouter;
