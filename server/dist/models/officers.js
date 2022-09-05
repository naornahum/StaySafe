"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOfficerByID = exports.updateOfficer = exports.createOfficer = exports.getOfficerByID = exports.getOfficers = exports.insertOfficers = void 0;
const database_1 = require("../database");
const missiles_1 = require("./missiles");
function insertOfficers() {
    const statement = database_1.completedDatabase.prepare("INSERT INTO officers (name,email,phone) VALUES(?,?,?)");
    // Random data from Mockaroo - Credit to Rom React ©
    const detailes = [
        ["Leora Piegrome", "lpiegrome0@nyu.edu", "670-656-2087"],
        ["Karie Fardo", "kfardo1@people.com.cn", "683-278-7582"],
        ["Star Poxson", "spoxson2@huffingtonpost.com", "920-405-1365"],
        ["Grier Postans", "gpostans3@usa.gov", "459-652-8580"],
        ["Christoffer Chastagnier", "cchastagnier4@cyberchimps.com", "407-392-0683"],
        ["Dianne Wybern", "dwybern5@rediff.com", "478-957-1574"],
        ["Wilhelmine Adamovicz", "wadamovicz6@digg.com", "841-929-5936"],
        ["Mozelle Vero", "mvero7@dropbox.com", "786-506-1334"],
        ["Deina Gives", "dgives8@1688.com", "693-377-0111"],
        ["Othella Cleugher", "ocleugher9@rambler.ru", "638-716-2946"],
        ["Angelo Rosengarten", "arosengartena@icio.us", "423-367-1812"],
        ["Orin Dunstone", "odunstoneb@berkeley.edu", "982-848-5290"],
        ["Elnore Applegarth", "eapplegarthc@cnbc.com", "875-494-0410"],
        ["Elisabetta Romanski", "eromanskid@princeton.edu", "998-930-7208"],
        ["Wiley Kebell", "wkebelle@sourceforge.net", "297-969-1430"],
        ["Geri Simnell", "gsimnellf@mashable.com", "159-548-0160"],
        ["Collete Jakubovicz", "cjakuboviczg@columbia.edu", "977-973-4254"],
        ["Kurtis McGrah", "kmcgrahh@smugmug.com", "668-968-3110"],
        ["Whit Guerriero", "wguerrieroi@elpais.com", "934-753-1529"],
        ["Alfonse Dominetti", "adominettij@comsenz.com", "832-194-6147"],
        ["Gorden Adolthine", "gadolthinek@state.gov", "454-765-0675"],
        ["Kennie Brea", "kbreal@latimes.com", "810-879-7310"],
        ["Nike Ogilvy", "nogilvym@washingtonpost.com", "903-110-4454"],
        ["Nikolas Gabb", "ngabbn@blogger.com", "932-839-1285"],
        ["Blanche Norquay", "bnorquayo@sciencedirect.com", "703-150-4057"],
        ["Melisande Damrel", "mdamrelp@163.com", "822-422-8670"],
        ["Nelli Skett", "nskettq@yahoo.com", "796-585-4748"],
        ["Noella Verbrugge", "nverbrugger@shop-pro.jp", "783-765-0221"],
        ["Dion Demageard", "ddemageards@google.it", "809-422-1477"],
        ["Rolf Soares", "rsoarest@blogger.com", "584-867-4372"],
        ["Raina Lockie", "rlockieu@sun.com", "736-467-9072"],
        ["Marcellina De Fraine", "mdev@furl.net", "504-330-5705"],
        ["Abbie Blythe", "ablythew@toplist.cz", "688-920-2394"],
        ["Kasper Semorad", "ksemoradx@prlog.org", "522-878-4644"],
        ["Daile Ricciardiello", "dricciardielloy@edublogs.org", "275-552-8094"],
        ["Thoma Schiementz", "tschiementzz@umich.edu", "809-648-8762"],
        ["Jinny Hair", "jhair10@vimeo.com", "657-782-0547"],
        ["Adolf Garvagh", "agarvagh11@nsw.gov.au", "190-881-4717"],
        ["Tammie Fellnee", "tfellnee12@free.fr", "177-208-5981"],
        ["Clara Shama", "cshama13@shutterfly.com", "734-289-7534"],
        ["Chet Prisk", "cprisk14@google.cn", "511-429-7442"],
        ["Sibilla Middlewick", "smiddlewick15@rambler.ru", "228-425-1331"],
        ["Guthrie Schaumann", "gschaumann16@drupal.org", "867-388-1559"],
        ["Nara Witter", "nwitter17@w3.org", "510-628-5976"],
        ["Darin Keogh", "dkeogh18@reuters.com", "696-947-3596"],
        ["Karlen Stilldale", "kstilldale19@technorati.com", "111-846-6624"],
        ["Travus McBlain", "tmcblain1a@bravesites.com", "926-103-3100"],
        ["Sauncho Jasper", "sjasper1b@bluehost.com", "895-821-9817"],
        ["Kimberli Rasher", "krasher1c@alexa.com", "958-873-5910"],
        ["Stacia Byrcher", "sbyrcher1d@etsy.com", "384-732-3577"],
    ];
    for (let index = 0; index < detailes.length; index++) {
        const element = detailes[index];
        statement.run(...element);
    }
}
exports.insertOfficers = insertOfficers;
function getOfficers() {
    const statement = database_1.completedDatabase.prepare("SELECT * FROM officers");
    const officers = statement.all();
    return officers;
}
exports.getOfficers = getOfficers;
function getOfficerByID(officer_id) {
    const statement = database_1.completedDatabase.prepare("SELECT * FROM officers WHERE officer_id = ?");
    const officers = statement.all(officer_id);
    return officers;
}
exports.getOfficerByID = getOfficerByID;
function createOfficer(officer) {
    const statement = database_1.completedDatabase.prepare("INSERT INTO officers (name,email,phone) VALUES(?,?,?)");
    return statement.run([officer.name, officer.email, officer.phone]);
}
exports.createOfficer = createOfficer;
function updateOfficer(officerId, officers) {
    const oldOfficer = database_1.completedDatabase
        .prepare(`SELECT * FROM officers WHERE officer_id = ${officerId} `)
        .get();
    const newOfficer = Object.assign(Object.assign({}, oldOfficer), officers);
    const statement = database_1.completedDatabase.prepare("UPDATE officers SET name = ?,email = ?,phone = ? WHERE officer_id = ?");
    statement.run([newOfficer.name, newOfficer.email, newOfficer.phone, officerId]);
    return newOfficer;
}
exports.updateOfficer = updateOfficer;
function deleteOfficerByID(officer_id) {
    const missilesLinkedToOfficerStatement = database_1.completedDatabase.prepare("SELECT missile_id FROM missiles WHERE officer_id = ?");
    const missilesLinkedToOfficer = missilesLinkedToOfficerStatement.all(officer_id);
    missilesLinkedToOfficer.forEach((missile) => {
        (0, missiles_1.deleteMissileByID)(missile.missile_id);
    });
    const officer = getOfficerByID(officer_id);
    const deleteStatement = database_1.completedDatabase.prepare("DELETE FROM officers WHERE officer_id = ?");
    deleteStatement.run(officer_id);
    return officer;
}
exports.deleteOfficerByID = deleteOfficerByID;
