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
var COOKIE = '__RequestVerificationToken_OnSuite=olWg39nYbdhzDyqlW78IBz7b2qhGhE2G7Fc9gA_YvTj_8jN3onUCePY993LrdhlxKkP04H3WCrqHFQ2xygq4ujgRe4tr9uVHiUOFmrgqZjo1; __RequestVerificationToken_OnSuite_TokenId=dd38310f-7388-4f48-b62f-9ce5e52349c6; _ga=GA1.1.2071638245.1726591871; ck=a=+RMOokPN1rM=; bridge=action=create&src=api&xdb=false; t=561e4068-fc87-78d7-bc55-7d699355110f; sd=d6f5bb5a-5a65-4e7f-8ef7-f49293f93bc4; persona=student; _ga_GBR1P7H50V=GS1.1.1726591871.1.1.1726591927.0.0.0; userDataSessionID=e363191b-5696-470e-bd53-6be130d31148%7Cc30abfa1-cbc4-4d5e-b38f-b31c40da30cc; AuthSvcToken=cYY%2Fex7b8eEdy7fCsDq85LbroxJszKSSElL%2BfLrjZjDtASBnlT%2FPLzlVqr6mysxXwNLVvQ%2BlPwrZbGG%2BO40Ew4bVyTUWPkJD2BAKgAkWmu%2F4ezryXraMRpCionoSn%2FMHFSg199E%2Fb09PEux0C41KrpZ2g3N4QAAdAPATNWzGWBjg7HQpTMyhcPGwcsyiLcVPeknNhPuP8gV1Ai5378Ll8UDvo%2B0zxRwtU8vcrsjHPwouqpxUyjQReN5HnB38oou8wLfwSsapPa95h5cs0GSKZasL3FquWvgSVtwetPv2sWOYHBAyyMxUc0bu%2FfE%2B0n4K9iqV5pF0vdOJwy7i8KM0Wg%3D%3D.H4sIAAAAAAAAA51Sya7TMBRNGfSgIAF7kLpgScZmrISgw%2Bs8Ny08NpVf7DR%2BSWw3Tjp9PQnpBiGxqGV74XvuOfce32eCIHxoMhZhD6SYkjalIUYVoSJU80gnSFPWkGXuBSgGXDrFEaeASTTZyUcua4piyPnGEJEUp2fZiwCOuUxAjMo3H6PkM1RMGzq2JXoQIlE3gSU66FERdaT7NvQcs679UawIrdv0ciyOAIQJ4vzjY4J3QSpdAkR233maFVgp9GBBUqq8H%2FD7IqNNiY%2BTGMEXbpJdK%2Fh2WwU7fECkaPuuD2iMyVXp621sPEsKrpe%2Fih5KptdjusOkA1JUVS3NNBzV0eplqNpeLbtbdza6n7oL7%2BHgT%2BZDE3Z5sDa0eNnjZLS2zH5%2F41%2FMdhKoKNwPpuzCtuSy6q2zH7PhojVL5m1u1jEYb%2Fddz3ATZ0kJXvR6jANwVVnl5uYDsh1A10yj8Oga5KEJ7AV0cIA7od01nL0daK1IS0JmwO1lw%2BZjK8ziVnOQ2edpdPp5jibiZjwM2wf0JD7NGF1Gup4c2Igrfqnytpy%2FDs3%2Fh7yLz7lxlEaAMcmjcQl5s0QEHUH0txd2GSxWcT%2FPz3%2B57iTMeYbgJzdDX2qqVVshVtMUTa%2BpZsPQGopd603cVxI6MZyPVQlT1NrMS%2F%2BF%2FQZtq2k6RQMAAA%3D%3D';
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
module.exports.calculate = calculate;
