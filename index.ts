var munkres = require('munkres-js')
const COOKIE = '__RequestVerificationToken_OnSuite=olWg39nYbdhzDyqlW78IBz7b2qhGhE2G7Fc9gA_YvTj_8jN3onUCePY993LrdhlxKkP04H3WCrqHFQ2xygq4ujgRe4tr9uVHiUOFmrgqZjo1; __RequestVerificationToken_OnSuite_TokenId=dd38310f-7388-4f48-b62f-9ce5e52349c6; _ga=GA1.1.2071638245.1726591871; ck=a=+RMOokPN1rM=; bridge=action=create&src=api&xdb=false; t=561e4068-fc87-78d7-bc55-7d699355110f; sd=d6f5bb5a-5a65-4e7f-8ef7-f49293f93bc4; persona=student; _ga_GBR1P7H50V=GS1.1.1726591871.1.1.1726591927.0.0.0; userDataSessionID=e363191b-5696-470e-bd53-6be130d31148%7Cc30abfa1-cbc4-4d5e-b38f-b31c40da30cc; AuthSvcToken=cYY%2Fex7b8eEdy7fCsDq85LbroxJszKSSElL%2BfLrjZjDtASBnlT%2FPLzlVqr6mysxXwNLVvQ%2BlPwrZbGG%2BO40Ew4bVyTUWPkJD2BAKgAkWmu%2F4ezryXraMRpCionoSn%2FMHFSg199E%2Fb09PEux0C41KrpZ2g3N4QAAdAPATNWzGWBjg7HQpTMyhcPGwcsyiLcVPeknNhPuP8gV1Ai5378Ll8UDvo%2B0zxRwtU8vcrsjHPwouqpxUyjQReN5HnB38oou8wLfwSsapPa95h5cs0GSKZasL3FquWvgSVtwetPv2sWOYHBAyyMxUc0bu%2FfE%2B0n4K9iqV5pF0vdOJwy7i8KM0Wg%3D%3D.H4sIAAAAAAAAA51Sya7TMBRNGfSgIAF7kLpgScZmrISgw%2Bs8Ny08NpVf7DR%2BSWw3Tjp9PQnpBiGxqGV74XvuOfce32eCIHxoMhZhD6SYkjalIUYVoSJU80gnSFPWkGXuBSgGXDrFEaeASTTZyUcua4piyPnGEJEUp2fZiwCOuUxAjMo3H6PkM1RMGzq2JXoQIlE3gSU66FERdaT7NvQcs679UawIrdv0ciyOAIQJ4vzjY4J3QSpdAkR233maFVgp9GBBUqq8H%2FD7IqNNiY%2BTGMEXbpJdK%2Fh2WwU7fECkaPuuD2iMyVXp621sPEsKrpe%2Fih5KptdjusOkA1JUVS3NNBzV0eplqNpeLbtbdza6n7oL7%2BHgT%2BZDE3Z5sDa0eNnjZLS2zH5%2F41%2FMdhKoKNwPpuzCtuSy6q2zH7PhojVL5m1u1jEYb%2Fddz3ATZ0kJXvR6jANwVVnl5uYDsh1A10yj8Oga5KEJ7AV0cIA7od01nL0daK1IS0JmwO1lw%2BZjK8ziVnOQ2edpdPp5jibiZjwM2wf0JD7NGF1Gup4c2Igrfqnytpy%2FDs3%2Fh7yLz7lxlEaAMcmjcQl5s0QEHUH0txd2GSxWcT%2FPz3%2B57iTMeYbgJzdDX2qqVVshVtMUTa%2BpZsPQGopd603cVxI6MZyPVQlT1NrMS%2F%2BF%2FQZtq2k6RQMAAA%3D%3D';
const TWELFTH_FACET = "9536_Twelfth Grade";
const ELEVENTH_FACET = "9536_Eleventh Grade";
const KCD_LONG = -85.6689
const KCD_LAT = 38.2423

type UserEntry = {
  UserID: string;
  FirstName: string;
  LastName: string;
  PublishUserProfile: boolean;
  LargeFileName: string;
  Email: string;
  EmailBad: boolean;
  PublishEmail: boolean;

  AddressLine1: string;
  City: string;
  Zip: string;
  HomePhone: string; // trim if used
  MyContactsId: number;

  HasRelationships: boolean; // no idea what this is for
  GradYear: string;
  Grade: string; // empty!
  GradeDisplay: string; // use this instead of Grade
  Department: string;
  SpouseId: number;
  GradeNumeric: number; // always 0!
  GradeNumericDisplay: string; // use this instead of ^
  TotalCount: number; // ??
  Deceased: boolean; // !!?
  IsStudentInd: boolean; // ?

  PreferredAddressId: number;
  PreferredAddressLat: number;
  PreferredAddressLng: number;

  JobTitle: string; // empty
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

function fetchGrade(facet: string) {
  // encode and fetch
  facet = encodeURIComponent(facet);
  return fetch(`https://kcd.myschoolapp.com/api/directory/directoryresultsget?directoryId=1879&searchVal=&facets=${facet}&searchAll=false`, {
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
  }).then(res => res.json() as Promise<UserEntry[]>)
  .catch(e => {
    console.log(e)
  })
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

async function getData() {
  //aggregate data into junior and senior matricies
  //data for juniors
  const juniors = (await fetchGrade(ELEVENTH_FACET)).map(it => 
    ({ name: `${it.FirstName} ${it.LastName}`, lat: it.PreferredAddressLat, long: it.PreferredAddressLng }));
  //data for seniors
  const seniors = (await fetchGrade(TWELFTH_FACET)).map(it => 
    ({ name: `${it.FirstName} ${it.LastName}`, lat: it.PreferredAddressLat, long: it.PreferredAddressLng }));
  return [juniors, seniors]
}

async function calculate() {
  let [juniors, seniors] = await getData()
  const distMatrix = juniors.map(j => {
      return seniors.map(s => {
          return getDistanceFromLatLonInMi(j.lat, j.long, s.lat, s.long)
      })
  })
  
  return munkres(distMatrix).map(([idx1, idx2]) => ({
      person1: juniors[idx1].name,
      person2: seniors[idx2].name,
      dist: getDistanceFromLatLonInMi(juniors[idx1].lat, juniors[idx1].long, seniors[idx2].lat, seniors[idx2].long)
  }))
}

module.exports.calculate = calculate;