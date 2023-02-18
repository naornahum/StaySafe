import { completedDatabase } from "../database";

export function insertVaccinesHistory() {
  const statement = completedDatabase.prepare(
    "INSERT INTO vaccines_history (patient_id,nurse_id,clinic_id,vaccine_id,vaccine_date) VALUES(?,?,?,?,?)"
  );

  // Random data from Mockaroo
  const detailes = [
    [1, 1, 1, 1, "01/01/2020"],
    [1, 1, 1, 2, "21/01/2021"],
  ];

  for (let index = 0; index < detailes.length; index++) {
    const element = detailes[index];
    statement.run(...element);
  }
}

export function getVaccinesHistory() {
  const statement = completedDatabase.prepare("SELECT * FROM vaccines_history");
  const vaccineHistory = statement.all();
  return vaccineHistory;
}

export function getVaccineHistoryByID(vaccine_history_id: string) {
  const statement = completedDatabase.prepare(
    "SELECT * FROM vaccines_history WHERE vaccine_history_id = ?"
  );
  const vaccineHistory = statement.all(vaccine_history_id);
  return vaccineHistory;
}

export function createVaccineHistory(vaccine_history: any) {
  const statement = completedDatabase.prepare(
    "INSERT INTO vaccines_history (patient_id,nurse_id,clinic_id,vaccine_date) VALUES(?,?,?,?)"
  );
  return statement.run([
    vaccine_history.patient_id,
    vaccine_history.nurse_id,
    vaccine_history.clinic_id,
    vaccine_history.vaccine_date,
  ]);
}

export function deleteVaccineHistoryByID(vaccine_history_id: string) {
  const statement1 = completedDatabase.prepare(
    "SELECT * FROM vaccines_history WHERE vaccine_history_id = ?"
  );
  const deletedvaccineHistory = statement1.all(vaccine_history_id);

  const statement = completedDatabase.prepare(
    "DELETE FROM vaccines_history WHERE vaccine_history_id = ?"
  );
  statement.run(vaccine_history_id);
  return deletedvaccineHistory;
}
