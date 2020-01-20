var ROSLIB = require('roslib');
window.firstname="";
window.lastname="";
window.mobileno=""; //
window.email_personal="";
window.vehicleno=""; 
window.device="";
window.ins_det="";
window.email_ins="";
window.emer_name="";
window.emer_mobile=""; //
window.street_name="";
window.street_no=""; //
window.city="";
var mob1=0;
var mob2=0;
var street=0;

function crtwebSocket(){
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
    console.log("khf");
}
crtwebSocket();
function pub(){
var publisher = new ROSLIB.Topic({
    ros : window.ros,
    name : 'DetailsReg',
    messageType : 'sih/Details'
  });

  var sendmsg = new ROSLIB.Message({
      ID : device,
      Fname : firstname,
      Lname : lastname,
      PhNo : mobileno,
      emailID : email_personal,
      vehicleNum : vehicleno,
      InsEmID : email_ins,
      streetName : street_name,
      streetNo : street_no,
      city : city,
      emgcyContName : emer_name,
      emgcyContPhNo : emer_mobile
  });
  console.log("sent");
  publisher.publish(sendmsg);
}

$('#finish').click(function () {
    firstname= $('#firstname').val();
    lastname= $('#lastname').val();
    mob1= $('#mobileno').val();
    email_personal=$('#email-personal').val();
    vehicleno= $('#vehicleno').val();
    device= $('#device').val();
    ins_det= $('#ins-det').val();
    email_ins= $('#email-ins').val();
    emer_name= $('#emer-name').val();
    mob2= $('#emer-mobile').val();
    street_name= $('#street-name').val();
    street= $('#street-no').val();
    city= $('#city').val();

    mobileno=mob1.toString();
    emer_mobile=mob2.toString();
    street_no=street.toString();

    console.log('values set');
    pub();
    //window.location.href = 'file:///home/nikki99/SIH/ROAD%20CARE/indexFinal.html';
 });