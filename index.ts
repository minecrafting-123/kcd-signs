var munkres = require('munkres-js')
const COOKIE = '__RequestVerificationToken_OnSuite=UGy23pcP-IG2Hp0780eTBmYMvHOjduEG-RrPYrlMCWWLC7qxpBOkMLIn4UVKmKGQG6SzG2yQ5dvpJ0KNBwPjPGS9kxLagbpRGzjqXaFkjPc1; __RequestVerificationToken_OnSuite_TokenId=9f3dccca-d7e5-420d-ad81-ba09bcf134b6; ck=a=+RMOokPN1rM=; bridge=action=create&src=api&xdb=false; sd=70f336e8-bd32-4034-8068-f605c99c9747; persona=student; t=ae84fc09-7a29-0fe4-01ec-6a789a8d90fd; userDataSessionID=3efb4f81-64d3-4c7f-bf68-e8b73d475fdb%7C19c333c2-6cf3-46c5-ace6-90ee31e13943; AuthSvcToken=l40jlegyRef4aDbC4dAJIIol7f0OazLUgURlnnQ4UO8Jvrq7%2B36pJ3pklbKVXPe8sO36EjPqTzd7HAy4yxVGkrrAoOIPrgwJEZ7k4wTFzKcpFqHSksbGBrGYpRjjqU%2FQzt1TsLO7lyNpG8Y%2F4sse0hCkN0SEhGEPYE9wjim%2F9jomti2QRHWU2l98rPvHZkXwIjpfD1OFKvl6rbQAwQ1dJQ0RA5yBfNd2f7c8g4ETTUBhJO5kn%2BkSwQ13eevoifkmuEJ3duRF9hCpHUe9KCTVhOn8EbALAv39y4zeyrPfWcI%2FkySDwx1gHhkUuq3xtnjIcs77cYlyn%2BcL9LWLX3GBxw%3D%3D.H4sIAAAAAAAAA51STZOaQBDVfJTJbqqS3JMqDzlGPgQRrUolqxCWVQSRddWLNTKDTBZmkAG%2Ffn0geMghlYNTM3OYfv1e95t%2BUavVPt4lSYR9kGFKhpQ%2BY1Sv1Wu3RUQLsyzp8zzzQxQDxh3jiFGQcDTd8gfGtwWhwxcbQ0QynJ14PwI4ZjwBMareAozSL1BQVNhTuy0fQtSSFdBt9dBGaMlIDlTo9xSp%2FUexXhtcp1dgcQQgTBFjnzYp3oYZdw4R2f5gWV5iuWcfliSVygeT6WXGkJIApzGCr7w0v1Tw%2FboKtniPSNl24x7QGJOL0rfr2FiellyvV2UPFdNNiFm8M7VJumroJKCpfyn47ZhuMdFAhm7ErqgKktQRpUvOcOb%2BXHv2SJ94tu8p0dQ29vPE8neOLs1XoXAUD2BgQmtimI5nECPAA3ykj4K4H013epLolnLW0b5rsnR8iBfDID3MqE1Vd2GSSUu7qMwK14vJWZvQOzuS0x3ZS206dc92EIzX4ycQnu4Hj5q9jD33YT4cag7qpc5yabi6O4CdJ%2BEgyopMjTDILbgJ7jp5ns%2Fi9fTXdIQXATtXKu%2BqwdRo8XHkfXwqHKU0AknC%2BTSuILcuIugAor%2B8UOVuuwqWq7xfFue%2FXA0OM5Yj%2BNmi5GtTFJoPOWm2hbbcFJV%2BR%2B5LYtOwvDccOia4mLcKVkT%2FCfsNATDOql4DAAA%3D';
const TWELFTH_FACET = "9536_Twelfth Grade";
const ELEVENTH_FACET = "9536_Eleventh Grade";

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

function deg2rad(deg){
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

async function calculate() {
    //aggregate data into junior and senior matricies
    //data for juniors
    const juniors = (await fetchGrade(ELEVENTH_FACET)).map(it => 
    ({ name: `${it.FirstName} ${it.LastName}`, lat: it.PreferredAddressLat, long: it.PreferredAddressLng })).filter(person => person.lat !== 0 && person.lng !== 0);
    //data for seniors
    const seniors = (await fetchGrade(TWELFTH_FACET)).map(it => 
    ({ name: `${it.FirstName} ${it.LastName}`, lat: it.PreferredAddressLat, long: it.PreferredAddressLng })).filter(person => person.lat !== 0 && person.lng !== 0);

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