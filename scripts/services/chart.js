'use strict';

angular.module('returnBoostApp')
  .factory('chart', ['$http', 'helper', 'COLORS', '$q', '$timeout', function($http, helper, COLORS, $q, $timeout) {
    var chart = {},
        strategyColors = {},
        colors = [];

    // @TODO move color selection to Strategy service
    // set colors to strategies
    for (var prop in COLORS) {
      colors.push(COLORS[prop]);
    }

    function _getStrategyColor(strategy) {
      if (angular.isUndefined(strategyColors[strategy.id])) {
        strategyColors[strategy.id] = colors.shift();
      }

      return strategyColors[strategy.id];
    }

    // retruns chart data obj for specific strategy
    chart.performance = function (strategies) {
      return $http({
        url: 'data/appendix-b.json',
        method: 'GET',
        transformResponse: [function (data) {
            // remove comments: /* ... */
            return angular.fromJson(data.replace(/(\/\*[\w\'\s\r\n\*]*\*\/)/g, ''));
        }]
      }).then(function(response) {
        var performanceChart = {},
          values = [],
          years = {};

        /**
         *  save first value of every year to an array.
         *  then we will use it on line chart as ticks on x-axis.
         *  this is need to have similar width between ticks
         */
        angular.forEach(response.data, function(val, i) {
          var date = new Date(val[0]);

          if (angular.isUndefined(years[date.getFullYear()]) && date.getMonth() < 6) { // month < 6 is to hide the tick of first year if it starts from over the middle. without that first two year's ticks could overlay each other
            years[date.getFullYear()] = val[0];
            values.push({x: val[0], y: val[1]});
          } else {
            if (i%10 > 0) { // use every 10th value for building line
              return;
            }
          }

          // save the value
          values.push({x: val[0], y: val[1]});
        });

        // Build chart data
        performanceChart.data = [];

        angular.forEach(strategies, function (strategy, i) {
          performanceChart.data.push({
            key: strategy.name,
            values: i === 0 ? values : angular.copy(values).map(function (item) {
              item.y += Math.random() * 20;
              return item;
            }),
            color: _getStrategyColor(strategy)
          });
        });

        performanceChart.options = {
            chart: {
                type: 'lineChart',
                height: 350,
                margin : {
                    top: 0,
                    right: 20,
                    bottom: 40,
                    left: 40
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: '',
                    tickFormat: function(ms){
                      var date = new Date(ms);
                      return date.getFullYear();
                    },
                    tickValues: function() {
                      // console.log('years', years);
                      var timestamps = [];
                      for (var prop in years) {
                        timestamps.push(years[prop]);
                      }

                      return timestamps;
                    },
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: '',
                    tickFormat: function(d){
                      return d3.format(',f')(d);
                    },

                    showMaxMin: false
                }
            }
        }

        return performanceChart;
      });
  }

  chart.risk = function (strategies) {
    var riskChart = {};

    // Inspired by Lee Byron's test data generator.
    function bumpLayer(n, o) {
      function bump(a) {
        var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
        for (var i = 0; i < n; i++) {
          var w = (i / n - y) * z;
          a[i] += x * Math.exp(-w * w);
        }
      }

      var a = [], i;
      for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
      for (i = 0; i < 5; ++i) bump(a);
      return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
    }

    var n = strategies.length, // number of layers
        m = 2, // number of samples per layer
        stack = d3.layout.stack(),
        layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
        yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
        yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });


    riskChart.data = [];

    angular.forEach(strategies, function (strategy, i) {
      riskChart.data.push({
        key: strategy.name,
        values: layers[i],
        color: _getStrategyColor(strategy)
      });
    });

    riskChart.options = {
      chart: {
        type: 'multiBarChart',
        height: 350,
        margin: {
          top: 0,
          right: 20,
          bottom: 40,
          left: 0
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        stacked: false,
        showControls: false
      }
    };

    // we will return a promise to immitate an $http or to sync with any other functions could be required to build data on production
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve(riskChart);
    }, 1);

    return deferred.promise;
  }

  chart.allocation = function (strategies) { // should it take selectedAssetClasses instead?
    var allocationChart = {};

    allocationChart.data = [];

    angular.forEach(strategies, function (strategy, i) {
      allocationChart.data.push({
        key: strategy.name,
        y: 100 / strategies.length,
        color: _getStrategyColor(strategy)
      });
    });

    allocationChart.options = {
      chart: {
          type: 'pieChart',
          height: 350,
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: true,
          duration: 500,
          labelThreshold: 0.01,
          labelSunbeamLayout: true,
          legend: {
              margin: {
                  top: 5,
                  right: 35,
                  bottom: 5,
                  left: 0
              }
          }
      }
    }

    // we will return a promise to immitate an $http or to sync with any other functions could be required to build data on production
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve(allocationChart);
    }, 1);

    return deferred.promise;
  }

  return chart;
}]);
