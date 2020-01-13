var link = require('./communication');

link.setupServer();

$('#camera').click(function () {
	link.Service(1);
});

$('#arduino').click(function() {
	link.Service(9);
});

$('#CameraStart').click(function () {
	link.Service(14);
});

$('#captserv').click(function () {
	link.Service(13);
});

$('#close').click(function(){
     $('#Graph').html(``);    
     console.log('closed');
 })