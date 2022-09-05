"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const missileRouter = (0, express_1.Router)();
missileRouter.get("/", (req, res) => {
    res.send(["a", "b", "c"]);
});
missileRouter.get("/:id", (req, res) => {
    res.send(req.params.id);
});
missileRouter.post("/", (req, res) => {
    const body = req.body;
    res.send(body);
});
missileRouter.put("/:id", (req, res) => {
    const body = req.body;
    res.send({ body, id: req.params.id });
});
exports.default = missileRouter;
