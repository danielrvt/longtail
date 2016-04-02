var request = require('request');
var async 	= require('async');
var _		= require('lodash');

var extensions = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','0'];

module.exports = {

	google: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];

		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var url = 'http://google.com/complete/search?client=firefox&ie=utf-8&oe=utf-8&q=' + combination + '&hl=de';
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var suggests = JSON.parse(response.body);				
					results.push.apply(results, suggests[1]);
					console.log(suggests[1]);
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	},

	bing: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];

		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var url = 'http://api.bing.com/osjson.aspx?query=' + combination + '&lang=de';
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var suggests = JSON.parse(response.body);
					results.push.apply(results, suggests[1]);
					console.log(suggests[1]);
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	},

	qwant: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];

		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var url = 'https://de.qwant.com/?c=suggest&lang=de&q=' + combination;
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var suggests = JSON.parse(response.body);
					results.push.apply(results, _.pluck(suggests,'value'));
					console.log(_.pluck(suggests,'value'));
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	},

	duckduckgo: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];

		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var url = 'https://ac.duckduckgo.com/ac/?&q=' + combination;
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var suggests = JSON.parse(response.body);
					results.push.apply(results, _.pluck(suggests,'phrase'));
					console.log(_.pluck(suggests,'phrase'));
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	},

	amazon: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];

		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var url = 'http://completion.amazon.co.uk/search/complete?method=completion&q=' + combination + '&search-alias=aps&client=amazon-search-ui&mkt=4&fb=1&xcat=0&x=updateISSCompletion&sc=1';
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					body = body.replace(';updateISSCompletion();','').replace('completion = ','');
					var suggests = JSON.parse(body);
					results.push.apply(results, suggests[1]);
					console.log(suggests[1]);
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	},

	otto: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];

		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var url = 'https://www.otto.de/suggest/json?&scope=%2F%2Fcatalog01%2Fde_DE&search=' + combination;
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var suggests = JSON.parse(response.body);
					if (!_.isUndefined(suggests.suggestionGroups[0].suggestions)) {
						var keywordCollection = suggests.suggestionGroups[0].suggestions;
						results.push.apply(results, _.pluck(keywordCollection,'searchterm'));
						console.log(_.pluck(keywordCollection,'searchterm'));
					}
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	},

	playstore: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];

		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var url = 'https://market.android.com/suggest/SuggRequest?json=1&c=0&query=' + combination + '&hl=de&gl=DE';
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var suggests = JSON.parse(body);
					results.push.apply(results, _.pluck(suggests,'s'));
					console.log(_.pluck(suggests,'s'));
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	},

	youtube: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];
		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var url = 'https://clients1.google.com/complete/search?client=youtube&ie=utf-8&oe=utf-8&gs_rn=23&gs_ri=youtube&ds=yt&cp=5&gs_id=1o&hl=de&gl=de&q=' + combination;
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					body = body.replace('window.google.ac.h(','').replace(')','');
					console.log(body);
					var suggests = JSON.parse(body);
					results.push.apply(results, _.pluck(suggests[1],0));
					console.log(_.pluck(suggests[1],0));
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	},

	youporn: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];
		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var cookies = ['age_verified=1','yp-device=pc','country=DE'];

			var url = 'http://www.youporn.com/search/autocomplete/' + combination;
			var jar = request.jar();
			cookies.forEach(function(cookie){ jar.setCookie(cookie, url); });

			request({url: url, jar: jar}, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var suggests = JSON.parse(body);
					results.push.apply(results, suggests.queries);
					console.log(suggests.queries);
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	},

	ebay: function(keyword, callback) {
		// Multiple keyword combinations
		var results = [];
		async.each(extensions, function requestSuggests(extension, callback){
			var combination = keyword + ' ' + extension;
			var url = 'http://anywhere.ebay.com/services/suggest/?&s=77&q=' + combination;
			request(url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var suggests = JSON.parse(response.body);
					results.push.apply(results, suggests[1]);
					console.log(suggests[1]);
				}
				else { console.log(error); }
				callback();
			});
		}, function() {
			callback(results);
		});
	}

}