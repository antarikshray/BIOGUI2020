var control = require('./keyboard');
var link = require('./comm');

var DATA_RATE = 10; //ms
var keyInterval;

control.initKeyboard();
link.setupServer();

$('#keyboardServo').click(function () {
	if ($(this).hasClass('btn-warning')) {
            $(this).removeClass('btn-warning').addClass('btn-success').html('Stop');
			keyInterval = setInterval(function() {
			    var data = control.processKeys();
			    link.sendData(data);
			}, DATA_RATE);
	} else if ($(this).text() == "Stop") {
            $(this).removeClass('btn-success').addClass('btn-warning').html('Servo');
            clearInterval(keyInterval);
    }
 });

$('#close').click(function(){
     $('#Graph').html(``);    
     console.log('closed');
 })