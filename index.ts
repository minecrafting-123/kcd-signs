/* TODO:
    Setup API for travel distance 
      IF need coords, Setup API to convert address line --> coords (stop spoofing yourself)
    Google sheets API to access addresses
    Figure out the deal with missing addresses and proper procedure after graduation
    Situations with excess students in either groupS
    
*/
var munkres = require('munkres-js')
const COOKIE = '__RequestVerificationToken_OnSuite=sTPrdBLGjSVASHp1BAvuydD0jYCjrRWAxKfuj5-QmhqILnVbOhg5KH9lNkq_RFOROIY6EqUcPaM4jJXVJhFqr1QGctCqi3E8femRxGewHXs1; __RequestVerificationToken_OnSuite_TokenId=cca5e046-19e3-4102-9dbd-1ef1767ee32e; _ga=GA1.1.553677966.1728414925; ck=a=+RMOokPN1rM=; bridge=action=create&src=api&xdb=false; t=fbe950e4-7911-84e2-ee0c-2ce2b1e5eadc; sd=e3cf8bc0-6e00-40b4-958a-2525dda711aa; persona=student; _ga_GBR1P7H50V=GS1.1.1728414924.1.1.1728414966.0.0.0; userDataSessionID=feb6bced-dfc4-433b-99ec-7f101c2e7a0a%7C216659c9-7e84-4b82-848f-6ec4eb3186c0; AuthSvcToken=cYS%2FmOEP59HaCw1v3r0UMAgs3G3VkEP35avW9RyuTidgV5NP8g2oP6EvUwb7vC%2F4S0Pb4cLZcFl4ovuSGB1bgA1OU%2BXTHeXAGjvQzTIvyOSn0GhiFpfFR9QJrb6JJ99EmKLAmgH97TpoeabSQdVM7DqtNrZtcRP0mDfM3mtLqTeo974p73MEW4ZK0X1jdDW%2Fde14%2BCdFccoaBbIofpiu%2FSGbQGtZyKm1ZCl9SEuNLZ8kUa%2BQdy8jSgh1Q37xkb9SiBBBwNLJcsvz1iTsA0TBnBZJoSITGME937zvIlqbQHbrVftadC10PLP74aCofEXr%2BkHzV5FxyuGdTcGM%2BYlnxQ%3D%3D.H4sIAAAAAAAAA51STY%2FaMBAN%2FdC2tFLb%2B1bi0GPJFyEkSFULCUshS2lJyO5yWRnbSbwksRsnsPTX12m4VKp6wLJ98Lx5b%2BZ5nkiS9G7EWEogKAnNHUp3BLekltQWETcpSzZUFA4TnAEuP2Ypp4DJtIiVA1d0Ve0rYhOE85KURwWmgGRcyUGGm7eI4OIDUk0L2dagCxHCXcMEg66Nt2rXwEZkIWibPf2PYksan6cnsCQFCBWY88ttQeKklH8lOI%2B%2F8LKqsfIOopqkUXk745M6w6F5RIoMo2dBUZ0q%2BHxeBTHZ47xu%2B%2BIroBnJT0qfzmPjVVFzPd%2FUPTRML69pTHIXlLitDXTLEJmG3YTajr%2B6ug%2BW3uRboM2PDCLc30bTeTb14sCaLKuC%2Btcs5DdJz1mkleemfKKF4V2YrjdW5N1tR%2FbVPp0b2s99ML6h4W7s58F4GmUM%2BHZyc3tS8YW5YkDuZyh46KlhQtfuD%2FDddOY9j1SDUeBNPYtZleGUZuD33XW1cGJtA9yJeTDCbeWFdIWMBxhqi5lVQtq%2FjUIWCqd2czTTN7BRed3Mn0vF%2F%2BRvsqMwjtIUMCZDmjWQVyuc4wNI%2F%2FLCtJpgver7qTj%2F5bqQCecVRu%2BDCn%2FsqFZnCcuOrupGR%2BsPNXOoDjrTRfBCxo%2BMiLFqYLr%2Bb9hvmDkZKEUDAAA%3D';
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
      "wh-version": "2024.10.07.1",
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

(async () => {
  console.log(await calculate())
})();

module.exports.calculate = calculate;