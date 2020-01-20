var ROSLIB = require('roslib');

var crtwebSocket = function(){
	var ros = new ROSLIB.Ros({
		url : 'ws://localhost:9090'
	});
  	ros.on('connection', function(){
  		console.log('Connected to websocket server.');
  	});
  	ros.on('error', function(error) {
    	console.log('Error connecting to websocket server: ', error);
  	});

	window.ros=ros;
}

module.exports.crtwebSocket = crtwebSocket;
