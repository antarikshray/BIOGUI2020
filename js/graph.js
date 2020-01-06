function tracecall(x, y, m, c) {
    var trace = {
        x: [],
        y: [],
        xaxis: x,
        yaxis: y,
        type: m,
        line: {
            color: c
        }
    };
    return trace;
}


var  plotLayout = ()=> {
    
    var c1 = '#DF56F1';
    var m1 = 'lines';

    var c2 = '#FFA07A';
    var m2 = 'lines';

    var c3 = '#530063';
    var m3 = 'lines';

    var c4 = '#661c3d';
    var m4 = 'lines';

    var c5 = '#2bc4a6';
    var m5 = 'lines';

    var c6 = '#3a544f';
    var m6 = 'lines';

    var c7 = '#66d42f';
    var m7 = 'lines';

    var c8 = '#cfbd21';
    var m8 = 'lines';

    var c9 = '#7a3a31';
    var m9 = 'lines';

    var layout1 = {
        title: 'Temperature',
        
        xaxis: {
            title: 'Time',
            domain: [0, 1]
        },
        yaxis: {
            title: 'ppm',
            domain: [0, 0.90]
        },
    };

    var layout2 = {
        title: 'Humidity',
        xaxis2: {
            title: 'Time',
            domain: [0, 1]
        },
        yaxis2: {
            title: 'ppm',
            domain: [0, 0.90]
        },
    };

    var layout3 = {
        title: 'Altitude',
        xaxis3: {
            title: 'Time',
            domain: [0, 1]
        },
        yaxis3: {
            title: 'ppm',
            domain: [0, 0.90]
        },
    };

    var layout4 = {
        title: 'Pressure',
        xaxis4: {
            title: 'Time',
            domain: [0, 1]
        },
        yaxis4: {
            title: 'ppm',
            domain: [0, 0.90]
        },
    };

    var layout5 = {
        title: 'Nitrogen',
        xaxis5: {
            title: 'Time',
            domain: [0, 1]
        },
        yaxis5: {
            title: 'ppm',
            domain: [0, 0.90]
        },
    };

    var layout6 = {
        title: 'CO2',
        xaxis6: {
            title: 'Time',
            domain: [0, 1]
        },
        yaxis6: {
            title: 'ppm',
            domain: [0, 0.90]
        },
    };

    var layout7 = {
        title: 'VOC',
        xaxis7: {
            title: 'Time',
            domain: [0, 1]
        },
        yaxis7: {
            title: 'ppm',
            domain: [0, 0.90]
        },
    };

    var data = [tracecall('x1', 'y1', m1, c1), 
                tracecall('x2', 'y2', m2, c2),
                tracecall('x3', 'y3', m3, c3),
                tracecall('x4', 'y4', m4, c4),
                tracecall('x5', 'y5', m5, c5),
                tracecall('x6', 'y6', m6, c6),
                tracecall('x7', 'y7', m7, c7),
               ];
    // TO MAKE EMPTY GRAPHS
    Plotly.plot('graph1', [data[0]], layout2)
    Plotly.plot('graph2', [data[1]], layout1)
    Plotly.plot('graph3', [data[2]], layout3)
    Plotly.plot('graph4', [data[3]], layout4)
    Plotly.plot('graph5', [data[4]], layout5)
    Plotly.plot('graph6', [data[5]], layout6)
    Plotly.plot('graph7', [data[6]], layout7)
}

var plotGraph = (Humidity, Temp, Alt, Press, Nitrogen, CO2, VOC)=> {

        var time = new Date();

        Plotly.extendTraces('graph1', {
            x: [
                [time]
            ],
            y: [
                [Temp]
            ]
        }, [0]);

       
        Plotly.relayout('graph1', {
            'xaxis.range': [time - 5000, time]
        });


        Plotly.extendTraces('graph2', {
            x: [
                [time]
            ],
            y: [
                [Humidity]
            ]
        }, [0]);
        
        Plotly.relayout('graph2', {
            'xaxis2.range': [time - 5000, time]
        });


        Plotly.extendTraces('graph3', {
            x: [
                [time]
            ],
            y: [
                [Alt]
            ]
        }, [0]);
        
        Plotly.relayout('graph3', {
            'xaxis3.range': [time - 5000, time]
        });


        Plotly.extendTraces('graph4', {
            x: [
                [time]
            ],
            y: [
                [Press]
            ]
        }, [0]);
        
        Plotly.relayout('graph4', {
            'xaxis4.range': [time - 5000, time]
        });

        Plotly.extendTraces('graph5', {
            x: [
                [time]
            ],
            y: [
                [Nitrogen]
            ]
        }, [0]);
        
        Plotly.relayout('graph5', {
            'xaxis5.range': [time - 5000, time]
        });


        Plotly.extendTraces('graph6', {
            x: [
                [time]
            ],
            y: [
                [CO2]
            ]
        }, [0]);
        
        Plotly.relayout('graph6', {
            'xaxis6.range': [time - 5000, time]
        });


        Plotly.extendTraces('graph7', {
            x: [
                [time]
            ],
            y: [
                [VOC]
            ]
        }, [0]);
        
        Plotly.relayout('graph7', {
            'xaxis7.range': [time - 5000, time]
        });

 }

module.exports.plotLayout = plotLayout;
module.exports.plotGraph = plotGraph;
