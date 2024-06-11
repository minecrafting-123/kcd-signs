import munkres from 'munkres';

const COOKIE =
  '__RequestVerificationToken_OnSuite=eoatCsEIXHivWH13OgHrkNv0JI-A-xkz8_QWF_vc5_o77ZiGatXwvCoNm7BLKIk4jv2o-DEhK9URuKENot38aqJkidUd4Pcsaq3rm2hv7MQ1; __RequestVerificationToken_OnSuite_TokenId=e40bc564-4ddc-4d0b-8aeb-a3bf7cacbe2c; ck=a=+RMOokPN1rM=; bridge=action=create&src=api&xdb=false; sd=3e0cb558-514c-4ccb-ab75-3c54ce014417; persona=student; t=20f515c5-bffb-51af-4457-a562406f0e28; userDataSessionID=4fcf21ee-addc-4fa5-a3f7-f3529bb08d8a%7Cebe47558-eec4-495d-82ff-62e94a4b46ce; AuthSvcToken=RNGZjDie4w%2BlmMQNXNH8lSZnT5CMc60amvsFbzoESkUtE8W%2BxJSfT%2Bw0uyd5ILKH7Mqsugi7X9KxB5LNi5HmrpbbQc102SLlawx5DdwjPloHdRR%2B093V9aObVDKxUv4ODHy7HFiqeZXzDPrHJczjzQ2BBfIr5GJWb7cwHK8Ysxa9OL6bbxWlkAFOi94aY81bsvlBEP3zlkAirkvNKirDg4OrZzxKE9dE8fnmZD8lMgEkqwwTBy4RYHO3lff5565tAy4aruE5DU9JSjULYRWw%2FWdONK17qZCy6nr%2BNJKbAH2er%2BPFR%2B4DiUs%2FjoFPapoCirCYcmDbeAGDDm0%2Bvqf6zw%3D%3D.H4sIAAAAAAAAA51SSY%2FaMBSGLqKdqdT23kocemxWAkmQqhZCWAcYIAzLBZnYgIfYzsQO269v0nDooeoBy%2FbB71vee36vcrnc51oYBtgHAjPqMLbHKJ%2FL5%2B6TSGMnRFhVFO7vEAFcPpGAMxDKLNoqR67oqlpWko0hogKLs%2BIHABOuUEBQ9rbBKPoG1YoFbcuUfAiRZFSAKdlorUoGMjYW9O1KSf%2FjmM%2FVb%2FNLsDgAEEaI8y%2FrCG93Qr7sEN3%2B4iJOsfLeh6lI5vKpw92U4TC6wRFB8I0XxdcMft6WwRYfEE3LLrQBI5henX7cpsbjKNV6u0xryJTudpiTl05jEC0LLt2wyL8m%2FP6BbTFtAIHuNFOzNN0sq9aV40zGzZU37LkDzzrBEujZlUfKBJ8sJpfurLafHjSHrS1P9Y3T0%2FlJN5x5NOgNHTxBphj5tSnU24fK4bl51OeMxERdvIQDDyT8w0Yn%2FavLJOl6MjmrDvTGxqBZHz2Kkjse63N1ai73%2B%2BW53onWg2kbzU7SJe6a%2Fcaz9DBqbcvEXa%2BOi%2FF5Lnq41ez17eVqZi0vQb%2FThjaWhq6IXOda%2F4dsMBss%2BTj6kZyTjjIWgDCUfUYyyP0YUXQEwV%2B9sEslMwumK71fJ%2Be%2FWgUZcx4j%2BNWL0feiphW7MS3qqm4UNauqWtWyWWz1vXcyOoU4mbcMppf%2FDfsN7k%2FhtF4DAAA%3D';
const TWELFTH_FACET = '9536_Twelfth Grade';
const ELEVENTH_FACET = '9536_Eleventh Grade';
const KCD_LONG = -85.6689;
const KCD_LAT = 38.2423;

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
};

function getDistanceFromLatLonInMi(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  var R = 3959; // Radius of the earth in miles
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in miles
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

async function fetchGrade(facet: string) {
  // encode and fetch
  const parsedFacet = encodeURIComponent(facet);
  return fetch(
    `https://kcd.myschoolapp.com/api/directory/directoryresultsget?directoryId=1879&searchVal=&facets=${parsedFacet}&searchAll=false`,
    {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua':
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'wh-version': '2024.04.22.3',
        'x-requested-with': 'XMLHttpRequest',
        cookie: COOKIE,
        Referer: 'https://kcd.myschoolapp.com/app/student',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: null,
      method: 'GET',
    },
  )
    .then((res) => res.json() as Promise<UserEntry[]>)
    .catch((e) => {
      console.log(e);
      throw e;
    });
}

async function findOutliers() {
  const [juniors, seniors] = await getData();
  let outliers = [];
  for (let i = 0; i < Object.keys(juniors).length; i++) {
    let student = juniors[i];
    //if long or lat is more than 20 deg from KCD, smth is very wrong
    if (
      getDistanceFromLatLonInMi(
        student['lat'],
        student['long'],
        KCD_LAT,
        KCD_LONG,
      ) > 20
    ) {
      outliers.push(student.name);
    }
    //the above code should also catch any null islanders
  }
  for (let i = 0; i < Object.keys(seniors).length; i++) {
    let student = seniors[i];
    if (
      getDistanceFromLatLonInMi(
        student['lat'],
        student['long'],
        KCD_LAT,
        KCD_LONG,
      ) > 20
    ) {
      outliers.push(student.name);
    }
  }
  return outliers;
}

async function getData() {
  // aggregate data into junior and senior matricies
  // data for juniors
  const juniors = (await fetchGrade(ELEVENTH_FACET)).map((it) => ({
    name: `${it.FirstName} ${it.LastName}`,
    lat: it.PreferredAddressLat,
    long: it.PreferredAddressLng,
  }));
  // data for seniors
  const seniors = (await fetchGrade(TWELFTH_FACET)).map((it) => ({
    name: `${it.FirstName} ${it.LastName}`,
    lat: it.PreferredAddressLat,
    long: it.PreferredAddressLng,
  }));
  return [juniors, seniors];
}

async function calculate() {
  let [juniors, seniors] = await getData();
  const distMatrix = juniors.map((j) => {
    return seniors.map((s) => {
      return getDistanceFromLatLonInMi(j.lat, j.long, s.lat, s.long);
    });
  });

  return munkres(distMatrix).map(([idx1, idx2]) => ({
    person1: juniors[idx1].name,
    person2: seniors[idx2].name,
    dist: getDistanceFromLatLonInMi(
      juniors[idx1].lat,
      juniors[idx1].long,
      seniors[idx2].lat,
      seniors[idx2].long,
    ),
  }));
}

findOutliers().then((res) => console.log(res));

module.exports.calculate = calculate;
