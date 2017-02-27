export function unixTimeToString(unixTime) {
	var dateObj = new Date(unixTime);
	var year = dateObj.getUTCFullYear();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();

	var dateNow = new Date();
	var year0 = dateNow.getUTCFullYear();
	var month0 = dateNow.getUTCMonth() + 1;
	var day0 = dateNow.getUTCDate();
	
	if (year0 == year && month0 == month && day0 == day) {
		return 'Today'
	} else {
		return day + '-' + month + '-' + year;
	}
}

//Haversine formula: http://www.movable-type.co.uk/scripts/latlong.html

export function distanceBetweenTwoPoints(point1, point2) {
	var lon1 = point1[0], lat1 = point1[1],
			lon2 = point2[0], lat2 = point2[1]
	var R = 6371e3; // metres
	var φ1 = toRadians(lat1);
	var φ2 = toRadians(lat2);
	var Δφ = toRadians(lat2-lat1);
	var Δλ = toRadians(lon2-lon1);
	
	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	return d = R * c;
}

function toRadians(x) {
 return x * Math.PI / 180;
}

export function secondsToString(seconds) {
	var date = new Date(seconds * 1000);
	var hh = date.getUTCHours();
	var mm = date.getUTCMinutes();
	var ss = date.getSeconds();

	hh = (hh == 0) ? '' : hh + ':';
	//if (hh < 10) {hh = "0"+hh;}
	if (mm < 10) {mm = "0"+mm +':';}
	if (ss < 10) {ss = "0"+ss;}
	// This formats your string to HH:MM:SS
	return hh+mm+ss;
}