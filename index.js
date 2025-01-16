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
/* TODO:
    Setup API for travel distance
      IF need coords, Setup API to convert address line --> coords (stop spoofing yourself)
    Google sheets API to access addresses
    Figure out the deal with missing addresses and proper procedure after graduation
    Situations with excess students in either groupS
    
*/
var munkres = require('munkres-js');
var COOKIE = '__RequestVerificationToken_OnSuite=tHpP8AwFqgtRt90joYPIabdwzsQKkFf4DjOdIlsvoDDbXz6FN3zxzKutkoqHaryISZYaNXQ9aFKX29kIfUObLlnEAbu6T97QKV0EATidQyw1; __RequestVerificationToken_OnSuite_TokenId=f537bc36-837d-45b3-b867-3b94382103d5; _ga=GA1.1.846810904.1729177443; ck=a=+RMOokPN1rM=; bridge=action=create&src=api&xdb=false; t=4e6678e4-d4e3-4197-b9bd-bd2cdbc9c1b8; sd=757c93b7-bce1-4112-9ea0-4f678e92e067; persona=student; _ga_GBR1P7H50V=GS1.1.1729177443.1.1.1729177466.0.0.0; userDataSessionID=34350cfe-82ea-4e1f-a2f5-033c3df74c9f%7C2e01e1b9-edc3-41f0-9a6f-9a3d47dfba7d; AuthSvcToken=ExZHtrp7MQjPmwJxNo8Uf%2B3go6YhaLapT3O6TJmPJqFmrg%2FHac2%2FSouRzkT837HSb1AW50AxZ1h2ojxxERWADMOQe%2FOg2FQBE9BWBDTHz1QChe%2BUCYGL4kLw%2FblHeOaYb4Dwii3jFCCgRnYDiUVm1MIrcpjM8rAeEtkZgFAkH32eOp%2FAuoBUUGBvjuHkGe%2Fv3dixhfIbMXD%2BHtf%2Fvf8QpuOgt9prYqNIOworV7vWLgGEUZE3Y2OaibgjtY3t1r3jgCUtgYxennIIzunGncsxtQrTU9uE4UmpQOtkh8BHMm%2BsyzTdWULu5v5nLKGt%2BVb6Dl6stKAdAjEUUNCvw7e%2FDg%3D%3D.H4sIAAAAAAAAA51STY%2FaMBAN%2FdC2tFLb%2B1bi0GPJNwlBqtoNWT4aCA1kdyUuyBs7iZfEDrEDC7%2B%2BScOlUtUDlu2D5817M8%2FzQhCETzd5nuIQcEzJkNItRi2hJbSriJNwng8kiYUJygATn7OUUZCLtIilA5NUWe5J1cYQEY75UQpTgDMmEZCh5i3CqPgCZaMPrb7ZDSFEXd0AZtdCj3JXR3rUh6FlaOofxZZgX6ZXYXEKICwQY9ePBY4TLp4SROIfjJc1VtyGsCZpVD5O2W2dMaQkwkWG4KugKM8VfL%2BsghjvEanbvpoAmmFyVvp2GRsri5rr9bruoWF6O6MxJg7gqK2YqqWYpm5oTag9XC1Hm2Dh3nrBaWc%2B3EV%2Bgn4lxCnXu3JjuIkV2Iwdk8TWe6ONq96R42jmBspKHZqO52VLL%2FQO%2Btq3krkH%2BZ5qM86eFmFkPWhTW51tziqrytxqQDZTGNjOyJhAXdmfijHsBy7y8z57UuDc6IGtrqXcID%2BLXQntm9EB9LJx0VsH8f2koPyYQsv3%2FcXK8ZYacPl99KCoxjrDq0blfTN%2FDq3%2Bh3zIjpVxlKYgz8WQZg3k3RIRdADp316YTbBe9f2yOv%2FluhIxYyWCn4Ok%2FNpRzM4i5B1VVvWO0hvI%2BkA1OuN58EZEzzmuxqqBacq%2FYb8BSQfVp0UDAAA%3D';
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
