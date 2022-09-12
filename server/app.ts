import express, { Express } from "express";
import dotenv from "dotenv";
import missileRouter from "./routes/missileRouter";
import { insertLocations } from "./models/locations";
import { insertLocationsHistory } from "./models/location_history";
import { insertMissiles } from "./models/missiles";
import { insertPatients } from "./models/patients";
import locationHistoryRouter from "./routes/locationHistoryRouter";
import locationRouter from "./routes/locationRouter";
import patientRouter from "./routes/patientRouter";
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use("/missiles", missileRouter);
app.use("/officers", patientRouter);
app.use("/locations", locationRouter);
app.use("/locationsHistory", locationHistoryRouter);

app.get("/init", (req, res) => {
  insertPatients();
  insertLocations();
  insertMissiles();
  insertLocationsHistory();
  res.send(true);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
