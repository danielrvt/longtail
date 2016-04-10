var longtail = require('../index.js')

var keyword = 'schuhe'


longtail.google(keyword, function(err, suggests){
	if (!err) {
		console.log('Google: ',suggests.length);
	}
	else {
		console.log('Google: Error', err);
	}
})


longtail.bing(keyword, function(err, suggests){
	if (!err) {
		console.log('Bing: ',suggests.length);
	}
	else {
		console.log('Bing: Error', err);
	}
})


longtail.duckduckgo(keyword, function(err, suggests){
	if (!err) {
		console.log('DuckDuckGo: ',suggests.length);
	}
	else {
		console.log('DuckDuckGo: Error', err);
	}
})


longtail.amazon(keyword, function(err, suggests){
	if (!err) {
		console.log('Amazon: ',suggests.length);
	}
	else {
		console.log('Amazon: Error', err);
	}
})


longtail.otto(keyword, function(err, suggests){
	if (!err) {
		console.log('Otto: ',suggests.length);
	}
	else {
		console.log('Otto: Error', err);
	}
})


longtail.playstore(keyword, function(err, suggests){
	if (!err) {
		console.log('Google PlayStore: ',suggests.length);
	}
	else {
		console.log('Google PlayStore: Error', err);
	}
})


longtail.youtube(keyword, function(err, suggests){
	if (!err) {
		console.log('YouTube: ',suggests.length);
	}
	else {
		console.log('YouTube: Error', err);
	}
})


longtail.youporn(keyword, function(err, suggests){
	if (!err) {
		console.log('YouPorn: ',suggests.length);
	}
	else {
		console.log('YouPorn: Error', err);
	}
})


longtail.ebay(keyword, function(err, suggests){
	if (!err) {
		console.log('ebay: ',suggests.length);
	}
	else {
		console.log('ebay: Error', err);
	}
})