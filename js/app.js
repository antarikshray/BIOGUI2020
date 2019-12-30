var link = require('./communication');

link.setupServer();

$('#camera').click(function () {
	link.Service(1);
 });

$('#arduino').click(function() {
	link.Service(8);
});

$('#close').click(function(){
     $('#Graph').html(``);    
     console.log('closed');
 })