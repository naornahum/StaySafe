"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationHistoryByID = exports.createLocationHistory = exports.getLocationHistoryByID = exports.getLocationsHistory = exports.insertLocationsHistory = void 0;
const database_1 = require("../database");
function insertLocationsHistory() {
    const statement = database_1.completedDatabase.prepare("INSERT INTO locations_history (arrival_date,departure_date,missile_id,location_id) VALUES(?,?,?,?)");
    // Random data from Mockaroo - Credit to Rom React ©
    const detailes = [
        ["6/7/1994", "1/20/2020", 1, 1],
        ["10/21/1996", "3/14/2022", 2, 2],
        ["11/14/1999", "3/31/2010", 3, 3],
        ["3/14/1999", "8/19/2013", 4, 4],
        ["4/19/2000", "8/18/2021", 5, 5],
        ["7/30/1993", "7/29/2007", 6, 6],
        ["2/8/1995", "11/19/2017", 7, 7],
        ["2/12/2000", "3/8/2011", 8, 8],
        ["8/4/1999", "2/21/2004", 9, 9],
        ["11/24/1992", "3/11/2008", 10, 10],
        ["2/20/1997", "5/23/2021", 11, 11],
        ["8/25/1990", "4/14/2008", 12, 12],
        ["3/7/1993", "8/7/2007", 13, 13],
        ["9/15/1995", "8/24/2021", 14, 14],
        ["1/5/1992", "9/2/2006", 15, 15],
        ["10/10/1991", "12/11/2009", 16, 16],
        ["9/19/1996", "1/7/2011", 17, 17],
        ["2/9/1999", "8/22/2019", 18, 18],
        ["7/23/1994", "12/11/2019", 19, 19],
        ["11/1/1999", "9/18/2010", 20, 20],
        ["6/21/1999", "5/21/2018", 21, 21],
        ["5/14/2000", "10/13/2014", 22, 22],
        ["4/25/2000", "1/21/2003", 23, 23],
        ["10/6/1990", "12/11/2010", 24, 24],
        ["1/6/1991", "4/2/2015", 25, 25],
        ["2/25/1997", "12/9/2001", 26, 26],
        ["11/17/1991", "10/15/2013", 27, 27],
        ["10/2/1990", "6/12/2013", 28, 28],
        ["7/19/2000", "2/20/2011", 29, 29],
        ["11/11/1991", "1/13/2019", 30, 30],
        ["1/7/1991", "1/12/2004", 31, 31],
        ["6/28/1996", "4/19/2017", 32, 32],
        ["2/28/1999", "1/5/2012", 33, 33],
        ["8/3/1997", "9/29/2014", 34, 34],
        ["11/25/1995", "5/30/2011", 35, 35],
        ["11/26/1996", "4/17/2013", 36, 36],
        ["7/26/1991", "1/8/2006", 37, 37],
        ["9/1/1994", "12/3/2002", 38, 38],
        ["6/15/1992", "2/15/2013", 39, 39],
        ["7/19/1994", "4/17/2017", 40, 40],
        ["4/13/1997", "12/16/2002", 41, 41],
        ["12/23/1999", "4/15/2009", 42, 42],
        ["12/5/1990", "12/26/2011", 43, 43],
        ["5/26/1992", "4/20/2021", 44, 44],
        ["9/20/1994", "1/15/2012", 45, 45],
        ["2/19/1996", "2/21/2017", 46, 46],
        ["12/18/1995", "8/6/2004", 47, 47],
        ["8/29/1998", "2/17/2014", 48, 48],
        ["1/10/1998", "12/27/2019", 49, 49],
        ["5/12/1994", "11/14/2008", 50, 50],
    ];
    for (let index = 0; index < detailes.length; index++) {
        const element = detailes[index];
        statement.run(...element);
    }
}
exports.insertLocationsHistory = insertLocationsHistory;
function getLocationsHistory() {
    const statement = database_1.completedDatabase.prepare("SELECT * FROM locations_history");
    const locationHistory = statement.all();
    return locationHistory;
}
exports.getLocationsHistory = getLocationsHistory;
function getLocationHistoryByID(location_history_id) {
    const statement = database_1.completedDatabase.prepare("SELECT * FROM locations_history WHERE location_history_id = ?");
    const locationHistory = statement.all(location_history_id);
    return locationHistory;
}
exports.getLocationHistoryByID = getLocationHistoryByID;
function createLocationHistory(location_history) {
    const statement = database_1.completedDatabase.prepare("INSERT INTO locations_history (arrival_date,departure_date,missile_id,location_id) VALUES(?,?,?,?)");
    return statement.run([
        location_history.arrival_date,
        location_history.departure_date,
        location_history.missile_id,
        location_history.location_id,
    ]);
}
exports.createLocationHistory = createLocationHistory;
function deleteLocationHistoryByID(location_history_id) {
    const statement1 = database_1.completedDatabase.prepare("SELECT * FROM locations_history WHERE location_history_id = ?");
    const deletedlocationHistory = statement1.all(location_history_id);
    const statement = database_1.completedDatabase.prepare("DELETE FROM locations_history WHERE location_history_id = ?");
    statement.run(location_history_id);
    return deletedlocationHistory;
}
exports.deleteLocationHistoryByID = deleteLocationHistoryByID;
