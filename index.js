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
var _this = this;
var munkres = require('munkres-js');
var COOKIE = '__RequestVerificationToken_OnSuite=sTPrdBLGjSVASHp1BAvuydD0jYCjrRWAxKfuj5-QmhqILnVbOhg5KH9lNkq_RFOROIY6EqUcPaM4jJXVJhFqr1QGctCqi3E8femRxGewHXs1; __RequestVerificationToken_OnSuite_TokenId=cca5e046-19e3-4102-9dbd-1ef1767ee32e; _ga=GA1.1.553677966.1728414925; ck=a=+RMOokPN1rM=; bridge=action=create&src=api&xdb=false; t=fbe950e4-7911-84e2-ee0c-2ce2b1e5eadc; sd=e3cf8bc0-6e00-40b4-958a-2525dda711aa; persona=student; _ga_GBR1P7H50V=GS1.1.1728414924.1.1.1728414966.0.0.0; userDataSessionID=feb6bced-dfc4-433b-99ec-7f101c2e7a0a%7C216659c9-7e84-4b82-848f-6ec4eb3186c0; AuthSvcToken=cYS%2FmOEP59HaCw1v3r0UMAgs3G3VkEP35avW9RyuTidgV5NP8g2oP6EvUwb7vC%2F4S0Pb4cLZcFl4ovuSGB1bgA1OU%2BXTHeXAGjvQzTIvyOSn0GhiFpfFR9QJrb6JJ99EmKLAmgH97TpoeabSQdVM7DqtNrZtcRP0mDfM3mtLqTeo974p73MEW4ZK0X1jdDW%2Fde14%2BCdFccoaBbIofpiu%2FSGbQGtZyKm1ZCl9SEuNLZ8kUa%2BQdy8jSgh1Q37xkb9SiBBBwNLJcsvz1iTsA0TBnBZJoSITGME937zvIlqbQHbrVftadC10PLP74aCofEXr%2BkHzV5FxyuGdTcGM%2BYlnxQ%3D%3D.H4sIAAAAAAAAA51STY%2FaMBAN%2FdC2tFLb%2B1bi0GPJFyEkSFULCUshS2lJyO5yWRnbSbwksRsnsPTX12m4VKp6wLJ98Lx5b%2BZ5nkiS9G7EWEogKAnNHUp3BLekltQWETcpSzZUFA4TnAEuP2Ypp4DJtIiVA1d0Ve0rYhOE85KURwWmgGRcyUGGm7eI4OIDUk0L2dagCxHCXcMEg66Nt2rXwEZkIWibPf2PYksan6cnsCQFCBWY88ttQeKklH8lOI%2B%2F8LKqsfIOopqkUXk745M6w6F5RIoMo2dBUZ0q%2BHxeBTHZ47xu%2B%2BIroBnJT0qfzmPjVVFzPd%2FUPTRML69pTHIXlLitDXTLEJmG3YTajr%2B6ug%2BW3uRboM2PDCLc30bTeTb14sCaLKuC%2Btcs5DdJz1mkleemfKKF4V2YrjdW5N1tR%2FbVPp0b2s99ML6h4W7s58F4GmUM%2BHZyc3tS8YW5YkDuZyh46KlhQtfuD%2FDddOY9j1SDUeBNPYtZleGUZuD33XW1cGJtA9yJeTDCbeWFdIWMBxhqi5lVQtq%2FjUIWCqd2czTTN7BRed3Mn0vF%2F%2BRvsqMwjtIUMCZDmjWQVyuc4wNI%2F%2FLCtJpgver7qTj%2F5bqQCecVRu%2BDCn%2FsqFZnCcuOrupGR%2BsPNXOoDjrTRfBCxo%2BMiLFqYLr%2Bb9hvmDkZKEUDAAA%3D';
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
            "wh-version": "2024.10.07.1",
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
(function () { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = console).log;
                return [4 /*yield*/, calculate()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); })();
module.exports.calculate = calculate;
