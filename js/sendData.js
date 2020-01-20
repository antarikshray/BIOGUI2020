var ROSLIB = require('roslib');

var sendData = function(){

    var publisher = new ROSLIB.Topic({
      ros : window.ros,
      name : 'DetailsReg',
      messageType : 'jetson/Details'
    });

    var sendmsg = new ROSLIB.Message({
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
    
    publisher.publish(sendmsg);
}

module.exports.sendData = sendData;