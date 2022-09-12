"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completedDatabase = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
function createDB() {
    // Creates DB if not exists already
    if (!fs_1.default.existsSync("./Project.db")) {
        fs_1.default.openSync("./Project.db", "w");
    }
    const db = new better_sqlite3_1.default("Project.db", { verbose: console.log });
    // Create table
    const prepareStatements = [
        db.prepare(`CREATE TABLE IF NOT EXISTS patients(
              patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
              full_name TEXT NOT NULL,
              birthday DATE NOT NULL,
              phone_number TEXT NOT NULL,
              clinic_id INTEGER NOT NULL,
              FOREIGN KEY(clinic_id)
                  REFERENCES clinic(clinic_id)
          )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS nurses(
              nurse_id INTEGER PRIMARY KEY AUTOINCREMENT,
              nurse_name TEXT NOT NULL,
              clinic_id INTEGER NOT NULL,
              FOREIGN KEY(clinic_id)
                  REFERENCES clinic(clinic_id)
          )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS vaccines(
              vaccine_id INTEGER PRIMARY KEY AUTOINCREMENT,
              vaccine_name TEXT NOT NULL
          )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS clinic(
              clinic_id INTEGER PRIMARY KEY AUTOINCREMENT,
              clinic_name TEXT NOT NULL
          )`),
        db.prepare(`CREATE TABLE IF NOT EXISTS vaccines_history(
              patient_id INTEGER NOT NULL,
              nurse_id INTEGER NOT NULL,
              clinic_id INTEGER NOT NULL,
              vaccine_date INTEGER NOT NULL,
              FOREIGN KEY(patient_id)
                  REFERENCES patients(patient_id),
              FOREIGN KEY(nurse_id)
                  REFERENCES nurses(nurse_id),
              FOREIGN KEY(clinic_id)
                  REFERENCES clinic(clinic_id)
              CONSTRAINT PK_VaccineHistory PRIMARY KEY (patient_id,nurse_id,clinic_id)
          )`),
    ];
    prepareStatements.forEach((statement) => {
        statement.run();
    });
    return db;
}
exports.completedDatabase = createDB();
