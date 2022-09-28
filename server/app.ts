import express, { Express } from "express";
import dotenv from "dotenv";
import nurseRouter from "./routes/nursesRouter";
import { insertLocationsHistory } from "./models/location_history";
import { insertNurses } from "./models/nurses";
import { insertPatients } from "./models/patients";
import locationHistoryRouter from "./routes/locationHistoryRouter";
import patientRouter from "./routes/patientRouter";
import vaccineRouter from "./routes/vaccineRouter";
import clinicRouter from "./routes/clinicRouter";
import { insertClinics } from "./models/clinics";
import { insertVaccines } from "./models/vaccines";
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use("/clinics", clinicRouter);
app.use("/nurses", nurseRouter);
app.use("/vaccines", vaccineRouter);
app.use("/patients", patientRouter);
app.use("/locationsHistory", locationHistoryRouter);

app.get("/init", (req, res) => {
  insertClinics();
  insertNurses();
  insertVaccines;
  insertPatients();
  insertLocationsHistory();
  res.send(true);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
