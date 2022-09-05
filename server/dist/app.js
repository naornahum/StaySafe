"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const missileRouter_1 = __importDefault(require("./routes/missileRouter"));
const locations_1 = require("./models/locations");
const location_history_1 = require("./models/location_history");
const missiles_1 = require("./models/missiles");
const officers_1 = require("./models/officers");
const locationHistoryRouter_1 = __importDefault(require("./routes/locationHistoryRouter"));
const locationRouter_1 = __importDefault(require("./routes/locationRouter"));
const officerRouter_1 = __importDefault(require("./routes/officerRouter"));
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use("/missiles", missileRouter_1.default);
app.use("/officers", officerRouter_1.default);
app.use("/locations", locationRouter_1.default);
app.use("/locationsHistory", locationHistoryRouter_1.default);
app.get("/init", (req, res) => {
    (0, officers_1.insertOfficers)();
    (0, locations_1.insertLocations)();
    (0, missiles_1.insertMissiles)();
    (0, location_history_1.insertLocationsHistory)();
    res.send(true);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
