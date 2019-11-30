var ROSLIB = require('roslib');
var counter = 0;

var graph = require('./graph');
var fs = require('fs');
var csvWriter = require('csv-write-stream');
var lineReader = require('line-reader');
var allowData = false;
var allowPlot = false;
var allowSpectro = false;

var terminator = [65, 120, 245, 1, 66, 245, 1, 121, 67];
var terminatorIndex = 0;
var spectroValues = [{
    pixelNumber: 0,
    intensity: 0
}];

var fileConnect = './data/data.csv';
var filePlot = './data/data.csv';

var writer = csvWriter();
var writer = csvWriter({
    headers: ['_', 'CO2', 'CH4', 'C3H8', 'NG', 'SPEC']
});

var setupServer = function () {
  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  ros.on('connection', function(){
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
  });

  window.rosBio=ros;

// topic is created and the node is named listener
  var listener = new ROSLIB.Topic({
         ros : rosBio,
         name : '/bioSensor',
         messageType : ''
       });


  listener.subscribe(function(message) {
          var SurTemp = message.St;
          var SurMoist= message.Sm;
          var AtmosTemp = message.At;
          var AtmosHum = message.Ah;
          var Alt = message.Alt;
          var Press = message.Press;
          var Ammon = message.Ammon;
          var Ozone = message.Oz;
          var CO2 = message.CO2;
          var VOC = message.VOC; 
          processMessage(SurTemp, SurMoist, AtmosTemp, AtmosHum, Alt, Press, Ammon, Ozone, CO2, VOC);
  });

    // required listners
    $('#updStatus').click(function () {
        if ($(this).hasClass('btn-warning')) {
            $(this).removeClass('btn-warning').addClass('btn-success').html('Stop');
            allowData = true;
        } else if ($(this).text() == "Stop") {
            $(this).removeClass('btn-success').addClass('btn-warning').html('Connect');
            allowData = false;
        }
    });
    $('#updGraph').click(function () {
        if ($(this).hasClass('btn-warning')) {
            $(this).removeClass('btn-warning').addClass('btn-success').html('Stop');
            allowPlot = true;
            $('#Graph').html(`
                <div class="row mt-1">
                    <div class="col-md-6">
                        <div id="graph1"></div>
                    </div>
                    <div class="col-md-6">
                        <div id="graph2"></div>
                    </div>
                    </div>
                    <div class="row  mt-1">
                        <div class="col-md-12">
                            <div id="graph3"></div>
                        </div>    
                    </div>
                </div>`);
            graph.plotLayout();
            formFileName();
            writer.pipe(fs.createWriteStream(fileConnect));
        } else if ($(this).text() == "Stop") {
            $(this).removeClass('btn-success').addClass('btn-warning').html('Plot');
            allowPlot = false;
            console.log('Stop');
        }
    });
}



$('#plotGraph').click(function () {
    if ($(this).hasClass('btn-warning')) {
        $(this).removeClass('btn-warning').addClass('btn-success').html('Stop');
        console.log("its working");
        $('#Graph').html(`
            <div class="row mt-1">
                <div class="col-md-6">
                    <div id="graph1"></div>
                </div>
                <div class="col-md-6">
                    <div id="graph2"></div>
                </div>
                </div>
                <div class="row  mt-1">
                    <div class="col-md-12">
                        <div id="graph3"></div>
                </div>
            </div>`);
        graph.plotLayout();
        allowPlot = true;
        lineNum = -1;
        formFileName();
        processMessageData();
    } else if ($(this).text() == "Stop") {
        $(this).removeClass('btn-success').addClass('btn-warning').html('Sensors');
        allowPlot = false;
        console.log("process stopped");
    }
});

var sendData = function (keys) { // data should be string

    var publisher = new ROSLIB.Topic({
      ros : window.rosBio,
      name : 'bioKey',
      messageType : 'std_msgs/String'
    });

    var sendKey = new ROSLIB.Message({
      data: keys      
    });

    //this function publishes the value to the rover.
    publisher.publish(sendKey);

}

var processMessage = function (SurTemp, SurMoist, AtmosTemp, AtmosHum, Alt, Press, Ammon, Ozone, CO2, VOC) {
        console.log(SurTemp+"  "+SurMoist+"  "+AtmosTemp+"  "+AtmosHum+"  "+Alt+"  "+Press+"  "+Ammon+"  "+Ozone+"  "+CO2+"  "+VOC);
        graph.plotGraph(SurTemp, SurMoist, AtmosTemp, AtmosHum, Alt, Press, Ammon, Ozone, CO2, VOC);
    
}


// var formFileName = function () {
//     var x = $("#fileName").val();
//     var y = $("#plotFileName").val();
//     fileConnect = './data/' + x;
//     filePlot = './data/' + y;
// }

module.exports.setupServer = setupServer;
module.exports.sendData = sendData;