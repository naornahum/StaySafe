import Database from "better-sqlite3";
import fs from "fs";

function createDB() {
  // Creates DB if not exists already
  if (!fs.existsSync("./Project.db")) {
    fs.openSync("./Project.db", "w");
  }

  const db = new Database("Project.db", { verbose: console.log });

  // Create tables
  const prepareStatements = [
    db.prepare(
      `CREATE TABLE IF NOT EXISTS patients(
              patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
              full_name TEXT NOT NULL,
              birthday DATE NOT NULL,
              phone_number TEXT NOT NULL,
              clinic_id INTEGER NOT NULL,
              FOREIGN KEY(clinic_id)
                  REFERENCES clinic(clinic_id)
          )`
    ),

    db.prepare(
      `CREATE TABLE IF NOT EXISTS nurses(
              nurse_id INTEGER PRIMARY KEY AUTOINCREMENT,
              nurse_name TEXT NOT NULL,
              clinic_id INTEGER NOT NULL,
              FOREIGN KEY(clinic_id)
                  REFERENCES clinic(clinic_id)
          )`
    ),

    db.prepare(
      `CREATE TABLE IF NOT EXISTS vaccines(
              vaccine_id INTEGER PRIMARY KEY AUTOINCREMENT,
              vaccine_name TEXT NOT NULL
          )`
    ),

    db.prepare(
      `CREATE TABLE IF NOT EXISTS clinics(
              clinic_id INTEGER PRIMARY KEY AUTOINCREMENT,
              clinic_name TEXT NOT NULL
          )`
    ),

    db.prepare(
      `CREATE TABLE IF NOT EXISTS vaccines_history(
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
          )`
    ),
  ];

  prepareStatements.forEach((statement) => {
    statement.run();
  });

  return db;
}

export const completedDatabase = createDB();
