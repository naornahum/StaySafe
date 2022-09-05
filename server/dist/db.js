"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
const locations_1 = require("./models/locations");
const location_history_1 = require("./models/location_history");
const missiles_1 = require("./models/missiles");
const officers_1 = require("./models/officers");
function createDB() {
    // Creates DB if not exists already
    if (!fs_1.default.existsSync("./Project.db")) {
        fs_1.default.openSync("./Project.db", "w");
    }
    const db = new better_sqlite3_1.default("Project.db", { verbose: console.log });
    // Create table
    const prepareStatements = [
        db.prepare(`CREATE TABLE IF NOT EXISTS locations(
                  location_id INTEGER PRIMARY KEY AUTOINCREMENT,
                  lat INTEGER NOT NULL,
                  lon INTEGER NOT NULL,
                  base_name TEXT NOT NULL,
                  nearest_city TEXT NOT NULL
          )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS officers(
              officer_id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT NOT NULL,
              phone TEXT NOT NULL
          )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS missiles(
              missile_id INTEGER PRIMARY KEY AUTOINCREMENT,
              model TEXT NOT NULL,
              quantity INTEGER NOT NULL,
              size INTEGER NOT NULL,
              manufacturing_year INTEGER NOT NULL,
              location_id INTEGER NOT NULL,
              officer_id INTEGER NOT NULL,
              FOREIGN KEY(location_id)
                  REFERENCES locations(location_id),
              FOREIGN KEY(officer_id)
                  REFERENCES officers(officer_id)
          )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS locations_history(
              location_history_id INTEGER PRIMARY KEY AUTOINCREMENT,
              arrival_date INTEGER NOT NULL,
              departure_date INTEGER NOT NULL,
              location_id INTEGER NOT NULL,
              missile_id INTEGER NOT NULL,
              FOREIGN KEY(location_id)
                  REFERENCES locations(location_id),
              FOREIGN KEY(missile_id)
                  REFERENCES missiles(missile_id)
          )`),
    ];
    prepareStatements.forEach((statement) => {
        statement.run();
    });
    (0, officers_1.insertOfficers)();
    (0, locations_1.insertLocations)();
    (0, missiles_1.insertMissiles)();
    (0, location_history_1.insertLocationsHistory)();
    return db;
}
exports.db = createDB();
