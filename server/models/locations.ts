import { completedDatabase } from "../database";

export function insertLocations() {
  const statement = completedDatabase.prepare(
    "INSERT INTO locations (lat,lon,base_name,nearest_city) VALUES(?,?,?,?)"
  );

  // Random data from Mockaroo
  const detailes = [
    [47.3591366, 2.8002946, "Screamer, crested", "Orléans"],
    [40.97465, 117.943348, "Small-spotted genet", "Shuangqiao"],
    [37.1893492, 119.9569362, "Asian foreset tortoise", "Sanjiazi"],
    [49.9776657, 20.9421091, "Purple moorhen", "Koszyce Wielkie"],
    [-7.1856094, 112.3188749, "Crane, brolga", "Tlogoagung"],
    [34.0313411, 131.3494901, "Bee-eater, nubian", "Sayama"],
    [29.521296, 86.27669, "Long-billed cockatoo", "Jiedu"],
    [39.7271767, 20.0598549, "American Virginia opossum", "Xarrë"],
    [27.44587, 118.679751, "Yellow-billed hornbill", "Xinpu"],
    [39.5013158, -0.3889622, "Wapiti, elk,", "Valencia"],
    [-8.2307484, 113.2998705, "Dabchick", "Krajan Tekung"],
    [46.0714056, 40.8784823, "Lion, south american sea", "Mirnyy"],
    [23.219932, 102.835223, "Black-footed ferret", "Yuanyang"],
    [36.6512, 117.120095, "Arboral spiny rat", "Jiegan"],
    [28.80901, 120.26121, "Yellow-necked spurfowl", "Huzhen"],
    [46.524052, 41.5008684, "Cat, european wild", "Sal’sk"],
    [35.3434929, 132.9039749, "Hornbill, yellow-billed", "Uji"],
    [37.9346483, 22.8455989, "Antechinus, brown", "Lékhaio"],
    [7.7247058, 81.7131828, "Ground monitor [unidentified]", "Batticaloa"],
    [41.6270289, -8.4553604, "Lemur, ring-tailed", "Cruzeiro"],
    [59.3268743, 18.2566877, "Lesser double-collared sunbird", "Saltsjö-Boo"],
    [15.3083007, 47.9787391, "Possum, western pygmy", "‘Amd"],
    [32.1018288, 72.7912031, "Western patch-nosed snake", "Sargodha"],
    [32.729683, 109.775985, "Sandgrouse, yellow-throated", "Miaogou"],
    [60.986717, 14.5654425, "Crested porcupine", "Mora"],
    [-6.3965, 105.9693, "Blue peacock", "Kaduseeng"],
    [38.9424786, 105.6553049, "Wood pigeon", "Bayan Hot"],
    [34.0683214, 72.6206912, "Olive baboon", "Topi"],
    [-23.3105968, -51.366412, "Pintail, bahama", "Rolândia"],
    [54.87559, 36.384275, "Caiman, spectacled", "Vorob’yovo"],
    [51.3383504, 12.3634475, "Squirrel, richardsons ground", "Leipzig"],
    [37.105382, 116.694361, "Levaillants barbet", "Xindian"],
    [9.8245916, 122.9082413, "Mule deer", "Payabon"],
    [54.145036, 48.390554, "Bear, american black", "Novoul’yanovsk"],
    [-11.8256582, 43.4536443, "Beaver, american", "Mohoro"],
    [58.5944316, 49.6634858, "Brown pelican", "Salmi"],
    [18.7486554, 99.1677572, "Cape wild cat", "San Kamphaeng"],
    [49.1809643, 13.5548562, "Nuthatch, red-breasted", "Humpolec"],
    [14.113818, -89.917591, "African elephant", "Comapa"],
    [39.959953, 116.298326, "Red lava crab", "Baidian"],
    [-6.9401945, 106.9247932, "Sloth, two-toed tree", "Cikondang"],
    [17.7855637, -99.9792312, "Trumpeter, dark-winged", "Vista Hermosa"],
    [44.5436259, 129.6373897, "Parakeet, rose-ringed", "Bamiantong"],
    [49.896245, 21.959222, "Wambenger, red-tailed", "Straszydle"],
    [36.6826123, 126.8483951, "Mynah, indian", "Yesan"],
    [46.3349544, 2.789104, "Openbill, asian", "Montluçon"],
    [43.5958543, 5.1190026, "Partridge, coqui", "Salon-de-Provence"],
    [36.266914, 111.920465, "Roseate cockatoo", "Guxian"],
    [38.240246, 114.32282, "Snowy owl", "Huangbizhuang"],
    [10.3753838, 123.9555544, "Blue-tongued skink", "Consolacion"],
  ];

  for (let index = 0; index < detailes.length; index++) {
    const element = detailes[index];
    statement.run(...element);
  }
}

export function getLocations() {
  const statement = completedDatabase.prepare("SELECT * FROM locations");
  const locations = statement.all();
  return locations;
}

export function getLocationByID(location_id: string) {
  const statement = completedDatabase.prepare("SELECT * FROM locations WHERE location_id = ?");
  const locations = statement.all(location_id);
  return locations;
}

export function createLocation(location: any) {
  const statement = completedDatabase.prepare(
    "INSERT INTO locations (lat,lon,base_name,nearest_city) VALUES(?,?,?,?)"
  );
  return statement.run([location.lat, location.lon, location.base_name, location.nearest_city]);
}

export function updateLocation(locationId: any, location: any) {
  const oldLocation = completedDatabase
    .prepare(`SELECT * FROM locations WHERE location_id = ${locationId} `)
    .get();
  const newLocation = { ...oldLocation, ...location };

  const statement = completedDatabase.prepare(
    "UPDATE locations SET lat = ?, lon = ?, base_name = ?, nearest_city = ? WHERE location_id = ?"
  );
  statement.run([
    newLocation.lat,
    newLocation.lon,
    newLocation.base_name,
    newLocation.nearest_city,
    locationId,
  ]);
  return newLocation;
}

export function deleteLocationByID(location_id: string) {
  const deleteLocationHistoryStatement = completedDatabase.prepare(
    "DELETE FROM locations_history WHERE location_id = ?"
  );
  deleteLocationHistoryStatement.run(location_id);

  const deleteMissileStatement = completedDatabase.prepare(
    "DELETE FROM missiles WHERE location_id = ?"
  );
  deleteMissileStatement.run(location_id);
  const location = getLocationByID(location_id);
  const statement = completedDatabase.prepare("DELETE FROM locations WHERE location_id = ?");
  statement.run(location_id);
  return location;
}
