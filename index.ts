/* TODO:
    Google sheets API - make it dynamic length :D
    Figure out the deal with missing addresses and proper procedure after graduation
    Situations with excess students in either groupS
    
*/
const munkres = require('munkres-js')
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

process.loadEnvFile('.env');

const KCD_LONG = -85.6689
const KCD_LAT = 38.2423

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
  var R = 3959; // Radius of the earth in miles
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in miles
  return d;
}

function deg2rad(deg: number){
  return deg * (Math.PI/180)
}

async function findOutliers() {
  const [juniors, seniors] = await getData()
  let outliers = []
  for (let i = 0; i < Object.keys(juniors).length; i++) {
    let student = juniors[i];
    //if long or lat is more than 20 deg from KCD, smth is very wrong
    if (getDistanceFromLatLonInMi(student['lat'], student['long'], KCD_LAT, KCD_LONG) > 20) {
      outliers.push(student.name);
    }
    //the above code should also catch any null islanders
  };
  for (let i = 0; i < Object.keys(seniors).length; i++) {
    let student = seniors[i];
    if (getDistanceFromLatLonInMi(student['lat'], student['long'], KCD_LAT, KCD_LONG) > 20) {
      outliers.push(student.name);
    }
  };
  return outliers;
}

async function geocode(row) {
  var address = row[3]
  const poboxpattern = /P.?O\.?\sbox\s[1-9]+/ig
  if (poboxpattern.test(address)){
    address = row[6].concat(" post office")
  }
  //const response = await limiter.schedule(() => fetch(`https://nominatim.openstreetmap.org/search?addressdetails=0&q=${address.replaceAll(" ","+")}+Kentucky&format=jsonv2&limit=1&viewbox=${KCD_LONG-1},${KCD_LAT-1},${KCD_LONG+1},${KCD_LAT+1}&bounded=1`));
  //const json = await response.json();
  //not on openstreetmap.org, we try MapBox
  const mapResponse = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&bbox=${KCD_LONG-1},${KCD_LAT-1},${KCD_LONG+1},${KCD_LAT+1}&access_token=${process.env.MAPBOX_TOKEN}`)
  const mapJson = await mapResponse.json();
  //console.log(mapJson["features"][0]["geometry"]["coordinates"])
  return [mapJson["features"][0]["geometry"]["coordinates"][0], mapJson["features"][0]["geometry"]["coordinates"][1]]
}

async function processCoords(array){
  const promises = array.map(address => geocode(address))
  const results = await Promise.all(promises)
  return results
}

//Mapbox API accepts 25 coordinates TOTAL, which means I can do 24 sources/1 destination when requesting distances. 
//I'll do groups of 24 juniors, so that I can easily request with the API, and just list out all the senior coordinates
function formatCoords(array, juniors, seniors){
  let seniorStr = Array<string>()
  let juniorStr = Array<string>()
  const juniorGroups = Math.ceil(juniors / 24)
  //senior data hopefully - will just be normal list
  let coordstr = ""
  for (let j = 0; j < seniors; j++){
    //console.log("HERE!" + array[j][0].toString())
    coordstr = coordstr.concat(`${array[j][0].toString()},${array[j][1].toString()};`)
  }
  seniorStr.push(coordstr.slice(0,-1))

  for (let i = 0; i < juniorGroups; i++) {
    let coordstr = ""
    //if it's the last group, go until the end, which is less than 24 entries
    if (i+1 == juniorGroups){
      //console.log(coordstr)
      for (let j = i*24; j < array.length-seniors; j++){
        //console.log(`HERE! ${array[j+seniors-1][0].toString()} numbero: ${j+seniors-1} total: ${array.length}`)
        coordstr = coordstr.concat(`${array[j+seniors][0].toString()},${array[j+seniors][1].toString()};`)
      }
      juniorStr.push(coordstr.slice(0,-1))
      break
    }
    for (let j = 0; j < 24; j++) {
      coordstr = coordstr.concat(`${array[i*24 + j + seniors][0].toString()},${array[i*24 + j + seniors][1].toString()};`)
    }
    juniorStr.push(coordstr.slice(0,-1))
    //console.log('coordstring gaming: ' + coordstr)
  }

  return [seniorStr, juniorStr]
}

//input strings of junior and senior 
//output array of distances between the juniors and seniors
async function drivingDistCalc(juniors: string[], seniors: string[], juniorCount: number, seniorCount: number) {
  let distMatrix = Array(juniorCount).fill(0).map(() => Array(seniorCount).fill(-1))
  // for (let i = 0; i < juniors.length; i++){
  //   for (let j = 0; j < seniors.length; j++){
  //     const response = fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordinates}?annotations=distance,duration&access_token=${process.env.MAPBOX_TOKEN}`)

  //   }
  // }

  console.log(distMatrix.length, distMatrix[0].length)
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/11pqF5CR_JDkNYcRgDsrFiIqKvbvjYCvbJ-GIP7I9izY
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listAddresses(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    //test spreadsheet ID: 1XtZwd1i4ih5OFrQdv747OCMiDOc8889iV3DD4_KMLg4
    //real ID: 11pqF5CR_JDkNYcRgDsrFiIqKvbvjYCvbJ-GIP7I9izY
    spreadsheetId: '11pqF5CR_JDkNYcRgDsrFiIqKvbvjYCvbJ-GIP7I9izY',
    range: 'Data Import!A2:L160',
  });
  //seniors, then juniors is spreadsheet format
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
  console.log('Name, Address:');
  let addresses = Array<string[]>()
  let problems = Array<string[]>()

  //variables for processing data while looping
  let juniorCount = 0
  let seniorCount = 0
  let prevYear = null
  let isSenior = true

  rows.forEach((row) => {
    //set year for juniors at beginning
    if (prevYear == null){
      prevYear = row[2]
    }

    if (prevYear != row[2]){
      isSenior = false
    }
    prevYear = row[2]

    const address = row[3]
    // TODO: store the problem addresses for later so manual input is ballin
    // IMPORTANT: counts don't include the people with problem addresses
    if (address != undefined && (address.length > 1)){
      if (isSenior){
        seniorCount += 1
      } else {
        juniorCount += 1
      }
      addresses.push(row)
    } else {
      problems.push(row)
    }
  });
  //console.log(addresses);
  const rawCoords = await processCoords(addresses)
  //console.log("lat, long:")
  //console.log(rawCoords)
  //console.log('first raw coord: ' + rawCoords[0])
  console.log(`Juniors ${juniorCount}, Seniors ${seniorCount}`)
  console.log(`first junior hopefully ${rawCoords[addresses.length-juniorCount]}`)
  
  const coordinateStrings = formatCoords(rawCoords, juniorCount, seniorCount)
  console.log(coordinateStrings)
  const distanceArray = await drivingDistCalc(coordinateStrings[1],coordinateStrings[0],juniorCount,seniorCount)
  //format: [seniorStr, juniorStr]

};


// async function calculate() {
//   let [juniors, seniors] = await getData()
//   const distMatrix = juniors.map(j => {
//       return seniors.map(s => {
//           return getDistanceFromLatLonInMi(j.lat, j.long, s.lat, s.long)
//       })
//   })
  
//   return munkres(distMatrix).map(([idx1, idx2]) => ({
//       person1: juniors[idx1].name,
//       person2: seniors[idx2].name,
//       dist: getDistanceFromLatLonInMi(juniors[idx1].lat, juniors[idx1].long, seniors[idx2].lat, seniors[idx2].long)
//   }))
// }

authorize().then(listAddresses).catch(console.error);
/*
(async () => {
  console.log(await calculate())
})();

module.exports.calculate = calculate;
*/