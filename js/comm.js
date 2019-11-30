var ROSLIB = require('roslib');
var graph = require('./graph');
var allowPlot = false;

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
                    <div class="col-md-4">
                        <div id="graph7"></div>
                    </div>
                    <div class="col-md-4">
                        <div id="graph8"></div>
                    </div>
                    <div class="col-md-4">
                        <div id="graph9"></div>
                    </div>    
                </div>
                `);
            graph.plotLayout();
        } else if ($(this).text() == "Stop") {
            $(this).removeClass('btn-success').addClass('btn-warning').html('Plot');
            allowPlot = false;
        }
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
          if(allowPlot) 
         	graph.plotGraph(SurTemp, SurMoist, AtmosTemp, AtmosHum, Alt, Press, Ammon, Ozone, CO2, VOC);
  });

}

var sendData = function (keys) { // data should be string

    var publisher = new ROSLIB.Topic({
      ros : window.rosBio,
      name : '/bioKey',
      messageType : 'std_msgs/Int16'
    });

    keys=parseInt(keys);
    
    var sendKey = new ROSLIB.Message({
      data: keys      
    });

    publisher.publish(sendKey);
}

module.exports.setupServer = setupServer;
module.exports.sendData = sendData;