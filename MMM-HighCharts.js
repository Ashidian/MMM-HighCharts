/* global Module */

/* Magic Mirror
 * Module: dynchart
 *
 * By Chris van Marle
 * MIT Licensed.
 */

Module.register("MMM-HighCharts",{

	// Default module config.
	defaults: {
		        series: [{
		            name: 'Random data',
		            data: (function () {
		                // generate an array of random data
		                var data = [],
		                    time = (new Date()).getTime(),
		                    i;
		
		                for (i = -19; i <= 0; i += 1) {
		                    data.push({
		                        x: time + i * 1000,
		                        y: Math.random()
		                    });
		                }
		                return data;
		            }())
		        }]
	},
	chart : null,
	options: null,

	// Define required scripts.
	getStyles: function () {
		return ["MMM-HighCharts.css"];
	},

	getScripts: function() {
		return [
			this.file('js/jquery.js'), 
			this.file('js/highcharts.js')
		]
	},

	notificationReceived: function(notification, payload, sender) {
		if (notification === "HIGHCHARTS_REFRESH") {
			//console.log(JSON.stringify(payload));
			this.options.series[0].data = payload;
			this.chart = new Highcharts.Chart(this.options);
		}
	},

	start: function() {
		Log.log("Starting module: " + this.name);




this.options = {
		        chart: {
			    backgroundColor: '#000000',
			    renderTo: 'HighCharts',
			    style: {
				fontFamily: '\'Unica One\', sans-serif'
			    },
		      	    plotBorderColor: '#606063',
		            type: 'spline',
		            animation: Highcharts.svg, // don't animate in old IE
		            marginRight: 10
		        },
		        title: {
		            text: 'Live random data'
		        },
		        xAxis: {
		            type: 'datetime',
		            tickPixelInterval: 150
		        },
		        yAxis: {
		            title: {
		                text: 'Value'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        legend: {
		            enabled: false
		        },
		        exporting: {
		            enabled: false
		        },
		        series: this.config.series
	};

		var self = this;
		$(document).ready(function () {
		    Highcharts.setOptions({
		        global: {
		            useUTC: false
		        }
		    });
		
		    self.chart = new Highcharts.Chart(self.options);
		});

                /*// set up the updating of the chart each second
                var series = self.options.series[0];
		console.log(JSON.stringify(series));
                setInterval(function () {
                    var x = (new Date()).getTime(), // current time
                        y = Math.random();
		    self.options.series[0].data.push({
		                        x: (new Date()).getTime(),
		                        y: Math.random()
		    });
		    self.chart = new Highcharts.Chart(self.options);
                }, 60000);
		//this.sendSocketNotification('START', this.config);
		*/
	},

	updateChartData: function() {
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.id = "HighCharts";
		wrapper.innerHTML = "hi";
		return wrapper;
	}
});