import { completedDatabase } from "../database";

export function insertNurses() {
  const statement = completedDatabase.prepare(
    "INSERT INTO nurses (nurse_name,clinic_id) VALUES(?,?)"
  );

  // Random data from Mockaroo - Credit to Rom React ©
  const detailes = [["CLONAZEPAM", 1]];

  for (let index = 0; index < detailes.length; index++) {
    const element = detailes[index];
    statement.run(...element);
  }
}

export function getNurses() {
  const statement = completedDatabase.prepare("SELECT * FROM nurses");
  const nurses = statement.all();
  return nurses;
}

export function getNurseByID(nurse_id: string) {
  const statement = completedDatabase.prepare("SELECT * FROM nurses WHERE nurse_id = ?");
  const nurses = statement.all(nurse_id);
  return nurses;
}

export function createNurses(nurse: any) {
  const statement = completedDatabase.prepare(
    "INSERT INTO nurses (nurse_name,clinic_id) VALUES(?,?)"
  );
  return statement.run([nurse.nurse_name, nurse.clinic_id]);
}

export function updateNurse(nurseId: any, nurse: any) {
  const oldNurse = completedDatabase
    .prepare(`SELECT * FROM nurses WHERE nurse_id = ${nurseId} `)
    .get();
  const newNurse = { ...oldNurse, ...nurse };

  const statement = completedDatabase.prepare(
    "UPDATE nurses SET nurse_name = ?,clinic_id = ? WHERE nurse_id = ?"
  );
  statement.run([nurse.nurse_name, nurse.clinic_id]);
  return newNurse;
}

export function deleteNurseByID(nurse_id: string) {
  // const deleteStatement = completedDatabase.prepare(
  //   "DELETE FROM locations_history WHERE nurse_id = ?"
  // );
  // deleteStatement.run(nurse_id);

  const statement = completedDatabase.prepare("DELETE FROM nurses WHERE nurse_id = ?");
  const nurses = statement.run(nurse_id);
  return nurses;
}
