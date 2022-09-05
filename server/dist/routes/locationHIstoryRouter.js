"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationHistoryRouter = (0, express_1.Router)();
locationHistoryRouter.get("/", (req, res) => {
    res.send(["a", "b", "c"]);
});
locationHistoryRouter.get("/:id", (req, res) => {
    res.send(req.params.id);
});
exports.default = locationHistoryRouter;
