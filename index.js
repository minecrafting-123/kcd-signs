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
var munkres = require('munkres-js');
var COOKIE = '__RequestVerificationToken_OnSuite=eoatCsEIXHivWH13OgHrkNv0JI-A-xkz8_QWF_vc5_o77ZiGatXwvCoNm7BLKIk4jv2o-DEhK9URuKENot38aqJkidUd4Pcsaq3rm2hv7MQ1; __RequestVerificationToken_OnSuite_TokenId=e40bc564-4ddc-4d0b-8aeb-a3bf7cacbe2c; ck=a=+RMOokPN1rM=; bridge=action=create&src=api&xdb=false; sd=3e0cb558-514c-4ccb-ab75-3c54ce014417; persona=student; t=20f515c5-bffb-51af-4457-a562406f0e28; userDataSessionID=4fcf21ee-addc-4fa5-a3f7-f3529bb08d8a%7Cebe47558-eec4-495d-82ff-62e94a4b46ce; AuthSvcToken=RNGZjDie4w%2BlmMQNXNH8lSZnT5CMc60amvsFbzoESkUtE8W%2BxJSfT%2Bw0uyd5ILKH7Mqsugi7X9KxB5LNi5HmrpbbQc102SLlawx5DdwjPloHdRR%2B093V9aObVDKxUv4ODHy7HFiqeZXzDPrHJczjzQ2BBfIr5GJWb7cwHK8Ysxa9OL6bbxWlkAFOi94aY81bsvlBEP3zlkAirkvNKirDg4OrZzxKE9dE8fnmZD8lMgEkqwwTBy4RYHO3lff5565tAy4aruE5DU9JSjULYRWw%2FWdONK17qZCy6nr%2BNJKbAH2er%2BPFR%2B4DiUs%2FjoFPapoCirCYcmDbeAGDDm0%2Bvqf6zw%3D%3D.H4sIAAAAAAAAA51SSY%2FaMBSGLqKdqdT23kocemxWAkmQqhZCWAcYIAzLBZnYgIfYzsQO269v0nDooeoBy%2FbB71vee36vcrnc51oYBtgHAjPqMLbHKJ%2FL5%2B6TSGMnRFhVFO7vEAFcPpGAMxDKLNoqR67oqlpWko0hogKLs%2BIHABOuUEBQ9rbBKPoG1YoFbcuUfAiRZFSAKdlorUoGMjYW9O1KSf%2FjmM%2FVb%2FNLsDgAEEaI8y%2FrCG93Qr7sEN3%2B4iJOsfLeh6lI5vKpw92U4TC6wRFB8I0XxdcMft6WwRYfEE3LLrQBI5henX7cpsbjKNV6u0xryJTudpiTl05jEC0LLt2wyL8m%2FP6BbTFtAIHuNFOzNN0sq9aV40zGzZU37LkDzzrBEujZlUfKBJ8sJpfurLafHjSHrS1P9Y3T0%2FlJN5x5NOgNHTxBphj5tSnU24fK4bl51OeMxERdvIQDDyT8w0Yn%2FavLJOl6MjmrDvTGxqBZHz2Kkjse63N1ai73%2B%2BW53onWg2kbzU7SJe6a%2Fcaz9DBqbcvEXa%2BOi%2FF5Lnq41ez17eVqZi0vQb%2FThjaWhq6IXOda%2F4dsMBss%2BTj6kZyTjjIWgDCUfUYyyP0YUXQEwV%2B9sEslMwumK71fJ%2Be%2FWgUZcx4j%2BNWL0feiphW7MS3qqm4UNauqWtWyWWz1vXcyOoU4mbcMppf%2FDfsN7k%2FhtF4DAAA%3D';
var TWELFTH_FACET = "9536_Twelfth Grade";
var ELEVENTH_FACET = "9536_Eleventh Grade";
var KCD_LONG = -85.6689;
var KCD_LAT = 38.2423;
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
function fetchGrade(facet) {
    // encode and fetch
    facet = encodeURIComponent(facet);
    return fetch("https://kcd.myschoolapp.com/api/directory/directoryresultsget?directoryId=1879&searchVal=&facets=".concat(facet, "&searchAll=false"), {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "wh-version": "2024.04.22.3",
            "x-requested-with": "XMLHttpRequest",
            "cookie": COOKIE,
            "Referer": "https://kcd.myschoolapp.com/app/student",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    }).then(function (res) { return res.json(); })
        .catch(function (e) {
        console.log(e);
    });
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
function getData() {
    return __awaiter(this, void 0, void 0, function () {
        var juniors, seniors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchGrade(ELEVENTH_FACET)];
                case 1:
                    juniors = (_a.sent()).map(function (it) {
                        return ({ name: "".concat(it.FirstName, " ").concat(it.LastName), lat: it.PreferredAddressLat, long: it.PreferredAddressLng });
                    });
                    return [4 /*yield*/, fetchGrade(TWELFTH_FACET)];
                case 2:
                    seniors = (_a.sent()).map(function (it) {
                        return ({ name: "".concat(it.FirstName, " ").concat(it.LastName), lat: it.PreferredAddressLat, long: it.PreferredAddressLng });
                    });
                    return [2 /*return*/, [juniors, seniors]];
            }
        });
    });
}
function calculate() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, juniors, seniors, distMatrix;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getData()];
                case 1:
                    _a = _b.sent(), juniors = _a[0], seniors = _a[1];
                    distMatrix = juniors.map(function (j) {
                        return seniors.map(function (s) {
                            return getDistanceFromLatLonInMi(j.lat, j.long, s.lat, s.long);
                        });
                    });
                    return [2 /*return*/, munkres(distMatrix).map(function (_a) {
                            var idx1 = _a[0], idx2 = _a[1];
                            return ({
                                person1: juniors[idx1].name,
                                person2: seniors[idx2].name,
                                dist: getDistanceFromLatLonInMi(juniors[idx1].lat, juniors[idx1].long, seniors[idx2].lat, seniors[idx2].long)
                            });
                        })];
            }
        });
    });
}
findOutliers().then(function (res) {
    return console.log(res);
});
module.exports.calculate = calculate;
