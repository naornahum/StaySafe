import { completedDatabase } from "../database";

export function insertClinics() {
  const statement = completedDatabase.prepare("INSERT INTO clinics (clinic_name) VALUES(?)");

  const detailes = [["Macabi"]];

  for (let index = 0; index < detailes.length; index++) {
    const element = detailes[index];
    statement.run(...element);
  }
}

export function getClinics() {
  const statement = completedDatabase.prepare("SELECT * FROM clinics");
  const clinics = statement.all();
  return clinics;
}

export function getClinicByID(clinic_id: string) {
  const statement = completedDatabase.prepare("SELECT * FROM clinics WHERE clinic_id = ?");
  const clinics = statement.all(clinic_id);
  return clinics;
}

export function createClinics(clinic: any) {
  const statement = completedDatabase.prepare("INSERT INTO clinics (clinic_name) VALUES(?)");
  return statement.run([clinic.clinic_name]);
}

export function updateClinic(clinicId: any, clinic: any) {
  const oldClinic = completedDatabase
    .prepare(`SELECT * FROM clinics WHERE clinic_id = ${clinicId} `)
    .get();
  const newClinic = { ...oldClinic, ...clinic };

  const statement = completedDatabase.prepare(
    "UPDATE clinics SET clinic_name = ? WHERE clinic_id = ?"
  );
  statement.run([clinic.clinic_name, clinic.clinic_id]);
  return newClinic;
}

export function deleteClinicByID(clinic_id: string) {
  // const deleteStatement = completedDatabase.prepare(
  //   "DELETE FROM locations_history WHERE clinic_id = ?"
  // );
  // deleteStatement.run(clinic_id);

  const statement = completedDatabase.prepare("DELETE FROM clinics WHERE clinic_id = ?");
  const clinics = statement.run(clinic_id);
  return clinics;
}
