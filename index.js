var Promise = require('promise'),
	request = require('request'),
	htmlparser = require("htmlparser2");

var url = "https://raw.github.com/mikeal/request/master/package.json";

pRequest(url, true).then(function (data) {
	console.log("%s@%s: %s", data.name, data.version, data.description);
}, function (err) {
	console.error("%s; %s", err.message, url);
	console.log("%j", err.res.statusCode);
});

// Promised request

function pRequest(url, json) {
	json = json || false;
	return new Promise(function (resolve, reject) {
		request({url:url, json:json}, function (err, res, body) {
			if (err) {
				return reject(err);
			} else if (res.statusCode !== 200) {
				err = new Error("Unexpected status code: " + res.statusCode);
				err.res = res;
				return reject(err);
			}
			resolve(body);
		});
	});
}