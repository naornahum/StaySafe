"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMissileByID = exports.updateMissile = exports.createMissiles = exports.getMissileByID = exports.getMissiles = exports.insertMissiles = void 0;
const database_1 = require("../database");
function insertMissiles() {
    const statement = database_1.completedDatabase.prepare("INSERT INTO missiles (model,quantity,size,manufacturing_year,location_id,officer_id) VALUES(?,?,?,?,?,?)");
    // Random data from Mockaroo - Credit to Rom React ©
    const detailes = [
        ["CLONAZEPAM", 901, 130, 1992, 1, 1],
        ["Hand Gel Prolim Instant Hand Sanitizer", 557, 75, 1994, 2, 2],
        ["Nite Time", 2, 66, 2010, 3, 3],
        ["IBUPROFEN", 774, 109, 2002, 4, 4],
        ["ESIKA Extreme Moisturizing SPF 16", 181, 87, 1993, 5, 5],
        ["PUR-WASH", 917, 136, 1997, 6, 6],
        ["Calamine Plus", 283, 126, 2010, 7, 7],
        ["cephalexin", 485, 133, 2007, 8, 8],
        ["Bamboo Sap Patch", 750, 131, 2002, 9, 9],
        ["Antiseptic", 971, 91, 2007, 10, 10],
        ["Quality Choice Cetirizine Hydrochloride", 664, 119, 2013, 11, 11],
        ["PRAVACHOL", 544, 145, 1997, 12, 12],
        ["Lycopodium Kit Refill", 638, 54, 2010, 13, 13],
        ["AZACTAM", 925, 145, 2005, 14, 14],
        ["Sprayology Hair and Nail Tonic", 532, 92, 1988, 15, 15],
        ["SEROQUEL", 305, 119, 1996, 16, 16],
        ["HYDROCODONE BITARTRATE AND ACETAMINOPHEN", 895, 64, 2011, 17, 17],
        ["Lyrica", 396, 136, 2004, 18, 18],
        ["Venlafaxine", 434, 57, 2005, 19, 19],
        ["Horseradish", 193, 126, 1997, 20, 20],
        ["Tetracycline Hydrochloride", 764, 124, 2001, 21, 21],
        ["Hydromorphone Hydrochloride", 924, 138, 2006, 22, 22],
        ["Bisacodyl", 715, 150, 2011, 23, 23],
        ["Ketoprofen", 597, 127, 1987, 24, 24],
        ["Citalopram Hydrobromide", 306, 152, 2005, 25, 25],
        [
            "Dextroamphetamine saccharate, amphetamine aspartate monohydrate, dextroamphetamine sulfate and amphetamine sulfate",
            762,
            132,
            1988,
            26,
            26,
        ],
        ["Loratadine", 748, 82, 1998, 27, 27],
        ["CARISOPRODOL", 373, 139, 1995, 28, 28],
        ["HAND SANITIZER", 943, 65, 2001, 29, 29],
        ["Topiramate", 758, 64, 1990, 30, 30],
        ["Valsartan and hydrochlorothiazide", 849, 154, 2005, 31, 31],
        ["Clorazepate Dipotassium", 612, 137, 1995, 32, 32],
        ["Benzo-Jel", 240, 54, 2005, 33, 33],
        ["SHISEIDO ADVANCED HYDRO-LIQUID COMPACT (REFILL]", 481, 129, 2008, 34, 34],
        ["Oxygen", 384, 128, 1999, 35, 35],
        ["Cold Multi-Symptom Daytime", 919, 149, 2005, 36, 36],
        ["COMPRESSED GAS, OXIDIZING, N.O.S.", 664, 146, 1990, 37, 37],
        ["HAMSOA YUYU PURE MILD WASH", 194, 47, 1997, 38, 38],
        ["Sodium Chloride", 173, 119, 2010, 39, 39],
        ["CORGARD", 286, 95, 2010, 40, 40],
        ["Oxy Daily Defense Facial Cleanser", 391, 126, 2009, 41, 41],
        ["Fluoxetine", 771, 141, 2009, 42, 42],
        ["Morphine Sulfate", 474, 55, 2002, 43, 43],
        ["Topcare ClearLax", 552, 90, 2007, 44, 44],
        ["CLE DE PEAU BEAUTE CR COMPACT FOUNDATION", 269, 45, 2008, 45, 45],
        ["image essentials hair regrowth treatment", 122, 85, 2007, 46, 46],
        ["Paroxetine", 964, 98, 2004, 47, 47],
        ["Tetracaine", 617, 69, 2006, 48, 48],
        ["Petrolatum", 144, 96, 2005, 49, 49],
        ["epirubicin hydrochloride", 658, 117, 1990, 50, 50],
    ];
    for (let index = 0; index < detailes.length; index++) {
        const element = detailes[index];
        statement.run(...element);
    }
}
exports.insertMissiles = insertMissiles;
function getMissiles() {
    const statement = database_1.completedDatabase.prepare("SELECT * FROM missiles");
    const missiles = statement.all();
    return missiles;
}
exports.getMissiles = getMissiles;
function getMissileByID(missile_id) {
    const statement = database_1.completedDatabase.prepare("SELECT * FROM missiles WHERE missile_id = ?");
    const missiles = statement.all(missile_id);
    return missiles;
}
exports.getMissileByID = getMissileByID;
function createMissiles(missile) {
    const statement = database_1.completedDatabase.prepare("INSERT INTO missiles (model,quantity,size,manufacturing_year,location_id,officer_id) VALUES(?,?,?,?,?,?)");
    return statement.run([
        missile.model,
        missile.quantity,
        missile.size,
        missile.manufacturing_year,
        missile.location_id,
        missile.officer_id,
    ]);
}
exports.createMissiles = createMissiles;
function updateMissile(missileId, missile) {
    const oldMissile = database_1.completedDatabase
        .prepare(`SELECT * FROM missiles WHERE missile_id = ${missileId} `)
        .get();
    const newMissile = Object.assign(Object.assign({}, oldMissile), missile);
    const statement = database_1.completedDatabase.prepare("UPDATE missiles SET model = ?,quantity = ?,size = ?,manufacturing_year = ?,location_id = ?,officer_id = ? WHERE missile_id = ?");
    statement.run([
        newMissile.model,
        newMissile.quantity,
        newMissile.size,
        newMissile.manufacturing_year,
        newMissile.location_id,
        newMissile.officer_id,
        missileId,
    ]);
    return newMissile;
}
exports.updateMissile = updateMissile;
function deleteMissileByID(missile_id) {
    const deleteStatement = database_1.completedDatabase.prepare("DELETE FROM locations_history WHERE missile_id = ?");
    deleteStatement.run(missile_id);
    const statement = database_1.completedDatabase.prepare("DELETE FROM missiles WHERE missile_id = ?");
    const missiles = statement.run(missile_id);
    return missiles;
}
exports.deleteMissileByID = deleteMissileByID;
