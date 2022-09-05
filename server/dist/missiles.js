"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertLocations = void 0;
const index_1 = require("../index");
function insertLocations() {
    const statement = index_1.db.prepare("INSERT INTO locations (lat,lon,base_name,nearest_city) VALUES(?,?,?,?)");
    // Random data from Mockaroo - Credit to Rom React ©
    const detailes = [];
    for (let index = 0; index < detailes.length; index++) {
        const element = detailes[index];
        statement.run(...element);
    }
}
exports.insertLocations = insertLocations;
