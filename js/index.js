var websocket = require('./webS');
var rosPublish = require('./sendData');
window.firstname="";
window.lastname="";
window.mobileno=""; //
window.email_personal="";
window.vehicleno=""; 
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

websocket.crtwebSocket();

$('#finish').click(function () {
    firstname= $('#firstname').val();
    lastname= $('#lastname').val();
    mob1= $('#mobileno').val();
    email_personal=$('#email-personal').val();
    vehicleno= $('#vehicleno').val();
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

    rosPublish.sendData();
 });