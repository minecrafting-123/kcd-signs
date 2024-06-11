export function getDistanceFromLatLonInMi(
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

export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
