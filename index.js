var request = require('request');
var async 	= require('async');
var _		= require('lodash');

var extensions = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','0'];

module.exports = {

	/**
	 * Retrieves keywords from Google
	 * @param  {[type]}   keyword Seed keyword
	 * @param  {Function} cb      callback(error, keywords)
	 */
	google: function(keyword, cb) {
		var results = [];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(' ', extension);

			var url = 'http://google.com/complete/search?client=firefox&ie=utf-8&oe=utf-8&q='.concat(combination, '&hl=de');

			request(url, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						var suggests = JSON.parse(res.body);
						results.push.apply(results, suggests[1]);
					}
					catch(err) {
						return cb(err);
					}
				}

				cb(err);
			});
		}, function(err) {
			cb(err, _.uniq(results));
		});
	},

	bing: function(keyword, cb) {
		var results = [];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(' ', extension);

			var url = 'http://api.bing.com/osjson.aspx?query='.concat(combination, '&lang=de');

			request(url, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						var suggests = JSON.parse(res.body);
						results.push.apply(results, suggests[1]);
					}
					catch(err) {
						return cb(err);
					}
				}

				cb(err);
			});
		}, function(err) {
			cb(err, _.uniq(results));
		});
	},

	duckduckgo: function(keyword, cb) {
		var results = [];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(' ', extension);

			var url = 'https://ac.duckduckgo.com/ac/?&q='.concat(combination);

			request(url, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						var suggests = JSON.parse(res.body);
						results.push.apply(results, _.pluck(suggests,'phrase'));
					}
					catch(err) {
						return cb(err);
					}
				}

				cb(err);
			});
		}, function(err) {
			cb(err, _.uniq(results));
		});
	},

	amazon: function(keyword, cb) {
		var results = [];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(' ', extension);

			var url = 'http://completion.amazon.com/search/complete?method=completion&q='.concat(combination, '&search-alias=aps&client=amazon-search-ui&mkt=4&fb=1&xcat=0&x=updateISSCompletion&sc=1');

			request(url, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						body = body.replace(';updateISSCompletion();','').replace('completion = ','');
						var suggests = JSON.parse(body);
						results.push.apply(results, suggests[1]);
					}
					catch(err) {
						return cb(err);
					}
				}

				cb(err);
			});
		}, function(err) {
			cb(err, _.uniq(results));
		});
	},

	otto: function(keyword, cb) {
		var results = [];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(' ', extension);

			var url = 'https://www.otto.de/suggest/json?&scope=%2F%2Fcatalog01%2Fde_DE&search='.concat(combination);

			request(url, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						var suggests = JSON.parse(res.body);
						if (!_.isUndefined(suggests.suggestionGroups[0].suggestions)) {
							var keywordCollection = suggests.suggestionGroups[0].suggestions;
							results.push.apply(results, _.pluck(keywordCollection,'searchterm'));
						}
					}
					catch(err) {
						return cb(err);
					}
				}

				cb(err);
			});
		}, function(err) {
			cb(err, _.uniq(results));
		});
	},

	playstore: function(keyword, cb) {
		var results = [];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(' ', extension);

			var url = 'https://market.android.com/suggest/SuggRequest?json=1&c=0&query='.concat(combination, '&hl=de&gl=DE');

			request(url, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						var suggests = JSON.parse(body);
						results.push.apply(results, _.pluck(suggests,'s'));
					}
					catch(err) {
						return cb(err);
					}
				}

				cb(err);
			});
		}, function(err) {
			cb(err, _.uniq(results));
		});
	},

	youtube: function(keyword, cb) {
		var results = [];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(' ', extension);

			var url = 'https://clients1.google.com/complete/search?client=youtube&ie=utf-8&oe=utf-8&gs_rn=23&gs_ri=youtube&ds=yt&cp=5&gs_id=1o&hl=de&gl=de&q='.concat(combination);

			request(url, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						body = body.replace('window.google.ac.h(','').replace(/\)/g,'')
						var suggests = JSON.parse(body);
						results.push.apply(results, _.pluck(suggests[1],0));
					}
					catch(err) {
						return cb(err);
					}
				}

				cb(err);
			});
		}, function(err) {
			cb(err, _.uniq(results));
		});
	},

	youporn: function(keyword, cb) {
		var results = [];

		// YouPorn requires age verification cookies, even for suggests
		var cookies = ['age_verified=1','yp-device=pc','country=DE'];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(' ', extension);

			var url = 'http://www.youporn.com/search/autocomplete/'.concat(combination);
			var jar = request.jar();
			cookies.forEach(function(cookie){ jar.setCookie(cookie, url); });

			request({url: url, jar: jar}, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						var suggests = JSON.parse(body);
						results.push.apply(results, suggests.queries);
					}
					catch(err) {
						return cb(err);
					}
				}

				cb(err);
			});
		}, function(err) {
			cb(err, _.uniq(results));
		});
	},

	ebay: function(keyword, cb) {
		var results = [];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(' ', extension);

			var url = 'http://autosug.ebaystatic.com/autosug?kwd='.concat(combination,'&_jgr=1&sId=77&_ch=0');

			request(url, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						body = body.match(/"sug":([^\]]*])/)
						if (body) {
							var suggests = JSON.parse(body[1]);
							results.push.apply(results, suggests);
						}
					}
					catch(err) {
						console.log(body)
						return cb(err);
					}
				}
				cb(err);
			});
		}, function(err) {
			cb(err, _.uniq(results));
		});
	},

	instagram: function(keyword, cb) {
		var results = [];

		async.each(extensions, function requestSuggests(extension, cb){
			var combination = keyword.concat(extension);

			var url = 'https://www.instagram.com/web/search/topsearch/?context=blended&query='.concat(combination);

			request(url, function(err, res, body) {
				if (!err && res.statusCode === 200) {
					try {
						var suggests = JSON.parse(body);
						results.push.apply(results, _.map(suggests.hashtags,'hashtag'));
					}
					catch(err) {
						console.log(body)
						return cb(err);
					}
				}
				cb(err);
			});
		}, function(err) {
			cb(err, _.sortBy(_.uniqBy(results,'name'),'media_count'));
		});
	}

}
