import { completedDatabase } from "../database";

export function insertVaccines() {
  const statement = completedDatabase.prepare("INSERT INTO vaccines (vaccine_name) VALUES(?)");

  // Random data from Mockaroo
  const detailes = [["NAOR"]];

  for (let index = 0; index < detailes.length; index++) {
    const element = detailes[index];
    statement.run(...element);
  }
}

export function getVaccines() {
  const statement = completedDatabase.prepare("SELECT * FROM vaccines");
  const vaccines = statement.all();
  return vaccines;
}

export function getVaccineByID(vaccine_id: string) {
  const statement = completedDatabase.prepare("SELECT * FROM vaccines WHERE vaccine_id = ?");
  const vaccines = statement.all(vaccine_id);
  return vaccines;
}

export function createVaccines(vaccine: any) {
  const statement = completedDatabase.prepare("INSERT INTO vaccines (vaccine_name) VALUES(?)");
  return statement.run([vaccine.vaccine_name]);
}

export function updateVaccine(vaccineId: any, vaccine: any) {
  const oldVaccine = completedDatabase
    .prepare(`SELECT * FROM vaccines WHERE vaccine_id = ${vaccineId} `)
    .get();
  const newVaccine = { ...oldVaccine, ...vaccine };

  const statement = completedDatabase.prepare(
    "UPDATE vaccines SET vaccine_name = ? WHERE vaccine_id = ?"
  );
  statement.run([vaccine.vaccine_name, vaccine.clinic_id]);
  return newVaccine;
}

export function deleteVaccineByID(vaccine_id: string) {
  // const deleteStatement = completedDatabase.prepare(
  //   "DELETE FROM locations_history WHERE vaccine_id = ?"
  // );
  // deleteStatement.run(vaccine_id);

  const statement = completedDatabase.prepare("DELETE FROM vaccines WHERE vaccine_id = ?");
  const vaccines = statement.run(vaccine_id);
  return vaccines;
}
