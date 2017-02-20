export function unixTimeToString(unixTime) {
	var dateObj = new Date(unixTime);
	var year = dateObj.getUTCFullYear();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();
	return day + '-' + month + '-' + year;
}