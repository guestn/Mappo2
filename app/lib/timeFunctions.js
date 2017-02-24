export function unixTimeToString(unixTime) {
	var dateObj = new Date(unixTime);
	var year = dateObj.getUTCFullYear();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();
	return day + '-' + month + '-' + year;
}

//Haversine formula: http://www.movable-type.co.uk/scripts/latlong.html
export function distanceBetweenTwoPoints(point1, point2) {
	var R = 6371e3; // metres
	var φ1 = lat1.toRadians();
	var φ2 = lat2.toRadians();
	var Δφ = (lat2-lat1).toRadians();
	var Δλ = (lon2-lon1).toRadians();
	
	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	
	return d = R * c;
}