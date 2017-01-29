var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var backPort = process.env.BACK_PORT;
var backHost = process.env.BACK_HOST;
var app2link = process.env.APP2LINK_URI;
var hostname = "";
var backResponse = "";
var response;

app.get('/', function (req, res) {
	callTheBack();
	response = res;
	
});


function callTheBack() {
			
		var options = {
			host: backHost,
			port:  parseInt(backPort),
			path: '/'
		};

		http.get(options, function (res) {
			res.on("data", function (chunk) {
				backResponse = chunk;
			});
		}).on('error', function (e) {
			backResponse = e.message;
		});
	response.end("back hostname" + hostname + " Back2Response " + backResponse)
};

function getLogPrefix(){
	return new Date() + "| back2back " + hostname + " | ";
}



server.listen(port, function () {
	hostname = server.address()
	console.log('#########################################################################################################');
	console.log(getLogPrefix() + "Start." );
	if (!backHost) {
		backHost = "back";
		backPort="80";
	}
	console.log(getLogPrefix() + " backHost=" + backHost + " backPort=" + backPort );


});
