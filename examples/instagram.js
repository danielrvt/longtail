var longtail = require('../index.js')

var keyword = 'hamburg'

longtail.instagram(keyword, function(err, suggests){
	if (!err) {
		console.log(suggests);
	}
	else {
		console.log('Instagram: Error', err);
	}
})