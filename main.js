var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var port = process.env.PORT;
var uuid = process.env.CNTM_INSTANCE_UUID;
var app2link = process.env.APP2LINK_URI;
var ipandport = "";

app.get('/', function (req, res) {
	res.end("see APCERA app logs");
});


function callapp2() {
	if (app2link) {
		ipandport = getIpPort();
		var options = {
			host: ipandport[0],
			port: parseInt(ipandport[1]),
			path: '/'
		};

		http.get(options, function (res) {
			res.on("data", function (chunk) {
				console.log(getLogPrefix() + "call " + chunk + " | " + ipandport[0]);
			});
		}).on('error', function (e) {
			console.log(getLogPrefix() + "Got error: " + e.message);
		});
	} else {
		console.log(getLogPrefix() + "JOB link not SET !");
	}
};

function getLogPrefix(){
	return new Date() + "| app1 " + uuid + " | ";
}

function getIpPort(){
	var app2link = process.env.APP2LINK_URI;
	return app2link.slice(6).split(':');
}

server.listen(port, function () {
	console.log('#########################################################################################################');
	console.log(getLogPrefix() + "Start. app2link=" + app2link);
	if (app2link) {
		ipandport = getIpPort();

		console.log(getLogPrefix() + 'app2 job link ip :' + ipandport[0] + ', port :' + ipandport[1]);

		setInterval(callapp2, 2000);

	} else {
		console.log(getLogPrefix() + "JOB link not SET !");
	}



});
