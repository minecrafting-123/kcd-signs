var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* TODO:
    Google sheets API - make it dynamic length :D
    Figure out the deal with missing addresses and proper procedure after graduation
    Situations with excess students in either groupS
    
*/
var munkres = require('munkres-js');
var fs = require('fs').promises;
var path = require('path');
var process = require('process');
var authenticate = require('@google-cloud/local-auth').authenticate;
var google = require('googleapis').google;
process.loadEnvFile('.env');
var KCD_LONG = -85.6689;
var KCD_LAT = 38.2423;
// If modifying these scopes, delete token.json.
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
var TOKEN_PATH = path.join(process.cwd(), 'token.json');
var CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
function loadSavedCredentialsIfExist() {
    return __awaiter(this, void 0, void 0, function () {
        var content, credentials, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.readFile(TOKEN_PATH)];
                case 1:
                    content = _a.sent();
                    credentials = JSON.parse(content);
                    return [2 /*return*/, google.auth.fromJSON(credentials)];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
function saveCredentials(client) {
    return __awaiter(this, void 0, void 0, function () {
        var content, keys, key, payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile(CREDENTIALS_PATH)];
                case 1:
                    content = _a.sent();
                    keys = JSON.parse(content);
                    key = keys.installed || keys.web;
                    payload = JSON.stringify({
                        type: 'authorized_user',
                        client_id: key.client_id,
                        client_secret: key.client_secret,
                        refresh_token: client.credentials.refresh_token,
                    });
                    return [4 /*yield*/, fs.writeFile(TOKEN_PATH, payload)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Load or request or authorization to call APIs.
 *
 */
function authorize() {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadSavedCredentialsIfExist()];
                case 1:
                    client = _a.sent();
                    if (client) {
                        return [2 /*return*/, client];
                    }
                    return [4 /*yield*/, authenticate({
                            scopes: SCOPES,
                            keyfilePath: CREDENTIALS_PATH,
                        })];
                case 2:
                    client = _a.sent();
                    if (!client.credentials) return [3 /*break*/, 4];
                    return [4 /*yield*/, saveCredentials(client)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, client];
            }
        });
    });
}
function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
    var R = 3959; // Radius of the earth in miles
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in miles
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
function findOutliers() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, juniors, seniors, outliers, i, student, i, student;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getData()];
                case 1:
                    _a = _b.sent(), juniors = _a[0], seniors = _a[1];
                    outliers = [];
                    for (i = 0; i < Object.keys(juniors).length; i++) {
                        student = juniors[i];
                        //if long or lat is more than 20 deg from KCD, smth is very wrong
                        if (getDistanceFromLatLonInMi(student['lat'], student['long'], KCD_LAT, KCD_LONG) > 20) {
                            outliers.push(student.name);
                        }
                        //the above code should also catch any null islanders
                    }
                    ;
                    for (i = 0; i < Object.keys(seniors).length; i++) {
                        student = seniors[i];
                        if (getDistanceFromLatLonInMi(student['lat'], student['long'], KCD_LAT, KCD_LONG) > 20) {
                            outliers.push(student.name);
                        }
                    }
                    ;
                    return [2 /*return*/, outliers];
            }
        });
    });
}
function geocode(row) {
    return __awaiter(this, void 0, void 0, function () {
        var address, poboxpattern, mapResponse, mapJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    address = row[3];
                    poboxpattern = /P.?O\.?\sbox\s[1-9]+/ig;
                    if (poboxpattern.test(address)) {
                        address = row[6].concat(" post office");
                    }
                    return [4 /*yield*/, fetch("https://api.mapbox.com/search/geocode/v6/forward?q=".concat(encodeURIComponent(address), "&bbox=").concat(KCD_LONG - 1, ",").concat(KCD_LAT - 1, ",").concat(KCD_LONG + 1, ",").concat(KCD_LAT + 1, "&access_token=").concat(process.env.MAPBOX_TOKEN))];
                case 1:
                    mapResponse = _a.sent();
                    return [4 /*yield*/, mapResponse.json()];
                case 2:
                    mapJson = _a.sent();
                    //console.log(mapJson["features"][0]["geometry"]["coordinates"])
                    return [2 /*return*/, [mapJson["features"][0]["geometry"]["coordinates"][0], mapJson["features"][0]["geometry"]["coordinates"][1]]];
            }
        });
    });
}
function processCoords(array) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = array.map(function (address) { return geocode(address); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
//Mapbox API accepts 25 coordinates TOTAL, which means I can do 24 sources/1 destination when requesting distances. 
//I'll do groups of 24 juniors, so that I can easily request with the API, and just list out all the senior coordinates
function formatCoords(array, juniors, seniors) {
    var seniorStr = Array();
    var juniorStr = Array();
    var juniorGroups = Math.ceil(juniors / 24);
    var seniorGroups = Math.ceil(seniors / 24);
    //senior data hopefully - will just be normal list
    var coordstr = "";
    for (var j = 0; j < seniors; j++) {
        //console.log("HERE!" + array[j][0].toString())
        coordstr = coordstr.concat("".concat(array[j][0].toString(), ",").concat(array[j][1].toString(), ";"));
    }
    seniorStr.push(coordstr.slice(0, -1));
    for (var i = 0; i < juniorGroups; i++) {
        var coordstr_1 = "";
        //if it's the last group, go until the end, which is less than 24 entries
        if (i + 1 == juniorGroups) {
            //console.log(coordstr)
            for (var j = i * 24; j < array.length - seniors; j++) {
                //console.log(`HERE! ${array[j+seniors-1][0].toString()} numbero: ${j+seniors-1} total: ${array.length}`)
                coordstr_1 = coordstr_1.concat("".concat(array[j + seniors][0].toString(), ",").concat(array[j + seniors][1].toString(), ";"));
            }
            juniorStr.push(coordstr_1.slice(0, -1));
            break;
        }
        for (var j = 0; j < 24; j++) {
            coordstr_1 = coordstr_1.concat("".concat(array[i * 24 + j + seniors][0].toString(), ",").concat(array[i * 24 + j + seniors][1].toString(), ";"));
        }
        juniorStr.push(coordstr_1.slice(0, -1));
        //console.log('coordstring gaming: ' + coordstr)
    }
    return [seniorStr, juniorStr];
}
//input strings of junior and senior 
//output array of distances between the juniors and seniors
function drivingDistCalc(juniors, seniors, juniorCount, seniorCount) {
    return __awaiter(this, void 0, void 0, function () {
        var distMatrix;
        return __generator(this, function (_a) {
            distMatrix = Array(juniorCount).fill(0).map(function () { return Array(seniorCount).fill(-1); });
            // for (let i = 0; i < juniors.length; i++){
            //   for (let j = 0; j < seniors.length; j++){
            //     const response = fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordinates}?annotations=distance,duration&access_token=${process.env.MAPBOX_TOKEN}`)
            //   }
            // }
            console.log(distMatrix.length, distMatrix[0].length);
            return [2 /*return*/];
        });
    });
}
/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/11pqF5CR_JDkNYcRgDsrFiIqKvbvjYCvbJ-GIP7I9izY
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listAddresses(auth) {
    return __awaiter(this, void 0, void 0, function () {
        var sheets, res, rows, addresses, problems, juniorCount, seniorCount, prevYear, isSenior, rawCoords, coordinateStrings, distanceArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sheets = google.sheets({ version: 'v4', auth: auth });
                    return [4 /*yield*/, sheets.spreadsheets.values.get({
                            //test spreadsheet ID: 1XtZwd1i4ih5OFrQdv747OCMiDOc8889iV3DD4_KMLg4
                            //real ID: 11pqF5CR_JDkNYcRgDsrFiIqKvbvjYCvbJ-GIP7I9izY
                            spreadsheetId: '11pqF5CR_JDkNYcRgDsrFiIqKvbvjYCvbJ-GIP7I9izY',
                            range: 'Data Import!A2:L160',
                        })];
                case 1:
                    res = _a.sent();
                    rows = res.data.values;
                    if (!rows || rows.length === 0) {
                        console.log('No data found.');
                        return [2 /*return*/];
                    }
                    console.log('Name, Address:');
                    addresses = Array();
                    problems = Array();
                    juniorCount = 0;
                    seniorCount = 0;
                    prevYear = null;
                    isSenior = true;
                    rows.forEach(function (row) {
                        //set year for juniors at beginning
                        if (prevYear == null) {
                            prevYear = row[2];
                        }
                        if (prevYear != row[2]) {
                            isSenior = false;
                        }
                        prevYear = row[2];
                        var address = row[3];
                        // TODO: store the problem addresses for later so manual input is ballin
                        // IMPORTANT: counts don't include the people with problem addresses
                        if (address != undefined && (address.length > 1)) {
                            if (isSenior) {
                                seniorCount += 1;
                            }
                            else {
                                juniorCount += 1;
                            }
                            addresses.push(row);
                        }
                        else {
                            problems.push(row);
                        }
                    });
                    return [4 /*yield*/, processCoords(addresses)
                        //console.log("lat, long:")
                        //console.log(rawCoords)
                        //console.log('first raw coord: ' + rawCoords[0])
                    ];
                case 2:
                    rawCoords = _a.sent();
                    //console.log("lat, long:")
                    //console.log(rawCoords)
                    //console.log('first raw coord: ' + rawCoords[0])
                    console.log("Juniors ".concat(juniorCount, ", Seniors ").concat(seniorCount));
                    console.log("first junior hopefully ".concat(rawCoords[addresses.length - juniorCount]));
                    coordinateStrings = formatCoords(rawCoords, juniorCount, seniorCount);
                    console.log(coordinateStrings);
                    return [4 /*yield*/, drivingDistCalc(coordinateStrings[1], coordinateStrings[0], juniorCount, seniorCount)
                        //format: [seniorStr, juniorStr]
                    ];
                case 3:
                    distanceArray = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
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
