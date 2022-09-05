import Database from "better-sqlite3";
import fs from "fs";

function createDB() {
  // Creates DB if not exists already
  if (!fs.existsSync("./Project.db")) {
    fs.openSync("./Project.db", "w");
  }

  const db = new Database("Project.db", { verbose: console.log });

  // Create table
  const prepareStatements = [
    db.prepare(
      `CREATE TABLE IF NOT EXISTS locations(
                  location_id INTEGER PRIMARY KEY AUTOINCREMENT,
                  lat INTEGER NOT NULL,
                  lon INTEGER NOT NULL,
                  base_name TEXT NOT NULL,
                  nearest_city TEXT NOT NULL
          )`
    ),

    db.prepare(
      `CREATE TABLE IF NOT EXISTS officers(
              officer_id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT NOT NULL,
              phone TEXT NOT NULL
          )`
    ),

    db.prepare(
      `CREATE TABLE IF NOT EXISTS missiles(
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
          )`
    ),

    db.prepare(
      `CREATE TABLE IF NOT EXISTS locations_history(
              location_history_id INTEGER PRIMARY KEY AUTOINCREMENT,
              arrival_date INTEGER NOT NULL,
              departure_date INTEGER,
              location_id INTEGER NOT NULL,
              missile_id INTEGER NOT NULL,
              FOREIGN KEY(location_id)
                  REFERENCES locations(location_id),
              FOREIGN KEY(missile_id)
                  REFERENCES missiles(missile_id)
          )`
    ),
  ];

  prepareStatements.forEach((statement) => {
    statement.run();
  });

  return db;
}

export const completedDatabase = createDB();
