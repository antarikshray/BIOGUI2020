var ROSLIB = require('roslib');
var graph = require('./graph');
var allowPlot = false;
var fs = require('fs');
var csvWriter = require('csv-write-stream');
var lineReader = require('line-reader');

var fileConnect = './data/data.csv';
var filePlot = './data/data.csv';

var writer = csvWriter();
var writer = csvWriter({
    headers: ['_', 'Temperature', 'Humidity', 'Altitude', 'Press', 'Nitrogen', 'CO2', 'VOC']
});

var setupServer = function () {
  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9091'
  });

  ros.on('connection', function(){
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
  });

  window.ros=ros;

// topic is created and the node is named listener
  var listener = new ROSLIB.Topic({
         ros : window.ros,
         name : '/sensor_data',
         messageType : 'jetson/BioNeuronSensor'
       });

  $('#updGraph').click(function () {
        if ($(this).hasClass('btn-warning')) {
            $(this).removeClass('btn-warning').addClass('btn-success').html('Stop');
            allowPlot = true;
            $('#Graph').html(`
                <div class="row mt-1">
                    <div class="col-md-4">
                        <div id="graph1"></div>
                    </div>
                    <div class="col-md-4">
                        <div id="graph2"></div>
                	</div>
                	<div class="col-md-4">
                        <div id="graph3"></div>
                	</div>
                </div>
                <div class="row mt-1">
                    <div class="col-md-4">
                        <div id="graph4"></div>
                    </div>
                    <div class="col-md-4">
                        <div id="graph5"></div>
                    </div>
                    <div class="col-md-4">
                        <div id="graph6"></div>
                    </div>    
                </div>
                <div class="row mt-1">
                    <div class="col-md-12">
                        <div id="graph7"></div>
                    </div>
                </div>
                `);
            graph.plotLayout();
            formFileName();
            writer.pipe(fs.createWriteStream(fileConnect));
        } else if ($(this).text() == "Stop") {
            $(this).removeClass('btn-success').addClass('btn-warning').html('Plot');
            allowPlot = false;
        }
    });	

  listener.subscribe(function(message) {
          var Temperature = message.Temperature;
          var Humidity = message.Humidity;
          var Altitude = message.Altitude;
          var Press = message.Pressure;
          var Nitrogen = message.Nitrogen;
          var CO2 = message.CO2;
          var VOC = message.VOC;
          if(allowPlot) {
         	  graph.plotGraph(Temperature, Humidity, Altitude, Press, Nitrogen, CO2, VOC);
            rite={Temperature, Humidity, Altitude, Press, Nitrogen, CO2, VOC};
            writer.write(rite, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
          }
  });
 

  $('#readPlot').click(function () {
    if($(this).hasClass('btn-warning')){
        $(this).removeClass('btn-warning').addClass('btn-success').html('StopRead');
        allowData=true;
        $('#Graph').html(`
                <div class="row mt-1">
                    <div class="col-md-4">
                        <div id="graph1"></div>
                    </div>
                    <div class="col-md-4">
                        <div id="graph2"></div>
                  </div>
                  <div class="col-md-4">
                        <div id="graph3"></div>
                  </div>
                </div>
                <div class="row mt-1">
                    <div class="col-md-4">
                        <div id="graph4"></div>
                    </div>
                    <div class="col-md-4">
                        <div id="graph5"></div>
                    </div>
                    <div class="col-md-4">
                        <div id="graph6"></div>
                    </div>    
                </div>
                <div class="row mt-1">
                    <div class="col-md-12">
                        <div id="graph7"></div>
                    </div>
                </div>
                `);
        graph.plotLayout();
        lineNum = -1;
        formFileName();
        lineReader.eachLine(filePlot, function (line, last) {
        if (allowData) {
            lineNum++;
            var msg = line.split(",");
            msg = msg.slice(0, 8);
            graph.plotGraph(parseFloat(msg[1]),parseFloat(msg[2]),parseFloat(msg[3]),parseFloat(msg[4]),parseFloat(msg[5]),parseFloat(msg[6]),parseFloat(msg[7]));
        } else return;
    });
    } else if ($(this).text() == "StopRead") {
      $(this).removeClass('btn-success').addClass('btn-warning').html('ReadPlot');
      allowData=false;
    }

  });

}

var Service = function (ser) {

  if(ser===1) {   
        var clientCamera = new ROSLIB.Service({
          ros : window.ros,
          name : '/capture_image',
          serviceType : 'jetson/captur'
        });

    var request = new ROSLIB.ServiceRequest({
           cap : ser
        });

    clientCamera.callService(request, function(result) {
    });
  }
  
  else {
    var clientArduino = new ROSLIB.Service({
          ros : window.ros,
          name : '/spine_the_nodes',
          serviceType : 'jetson/spine'
        });
    if($('#arduino').hasClass('btn-warning')){
      var request = new ROSLIB.ServiceRequest({
           signal : 9
        });
     }
     else if($('#arduino').hasClass('btn-success')){
      var request = new ROSLIB.ServiceRequest({
           signal : -9
        });
     } 

    clientArduino.callService(request, function(result) {
    
      if($('#arduino').hasClass('btn-warning')&&result.response===9){
        $('#arduino').removeClass('btn-warning').addClass('btn-success');
      }

      else if($('#arduino').hasClass('btn-success')&&result.response===-9){
        $('#arduino').removeClass('btn-success').addClass('btn-warning');
      }
    });
  }
}

var formFileName = function () {
    var x = $("#fileName").val();
    var y = $("#plotFileName").val();
    fileConnect = './data/' + x;
    filePlot = './data/' + y;
}

module.exports.setupServer = setupServer;
module.exports.Service = Service;
