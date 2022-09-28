import { completedDatabase } from "../database";
import { deleteNurseByID } from "./nurses";

export function insertPatients() {
  const statement = completedDatabase.prepare(
    "INSERT INTO patients (full_name,birthday,phone_number,clinic_id) VALUES(?,?,?,?)"
  );

  // Random data from Mockaroo
  const detailes = [["Leora Piegrome", "03/10/1998", "670-656-2087", 1]];

  for (let index = 0; index < detailes.length; index++) {
    const element = detailes[index];
    statement.run(...element);
  }
}

export function getPatients() {
  const statement = completedDatabase.prepare("SELECT * FROM patients");
  const patients = statement.all();
  return patients;
}

export function getPatientByID(patient_id: string) {
  const statement = completedDatabase.prepare("SELECT * FROM patients WHERE patient_id = ?");
  const patients = statement.all(patient_id);
  return patients;
}

export function createPatient(patient: any) {
  const statement = completedDatabase.prepare(
    "INSERT INTO patients (full_name,birthday,phone_number,clinic_id) VALUES(?,?,?,?)"
  );
  return statement.run([patient.name, patient.email, patient.phone]);
}

export function updatePatient(patientID: any, patients: any) {
  const oldPatient = completedDatabase
    .prepare(`SELECT * FROM patients WHERE patient_id = ${patientID} `)
    .get();
  const newPatient = { ...oldPatient, ...patients };

  const statement = completedDatabase.prepare(
    "UPDATE patients SET name = ?,email = ?,phone = ? WHERE patient_id = ?"
  );
  statement.run([newPatient.name, newPatient.email, newPatient.phone, patientID]);
  return newPatient;
}

export function deletePatientByID(patient_id: string) {
  const missilesLinkedToPatientStatement = completedDatabase.prepare(
    "SELECT missile_id FROM missiles WHERE patient_id = ?"
  );

  const missilesLinkedToPatient = missilesLinkedToPatientStatement.all(patient_id);

  missilesLinkedToPatient.forEach((missile) => {
    deleteNurseByID(missile.missile_id);
  });
  const patient = getPatientByID(patient_id);
  const deleteStatement = completedDatabase.prepare("DELETE FROM patients WHERE patient_id = ?");
  deleteStatement.run(patient_id);

  return patient;
}
