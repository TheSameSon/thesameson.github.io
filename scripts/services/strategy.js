'use strict';

angular.module('returnBoostApp')
  .factory('Strategy', ['$resource', '$filter', function($resource, $filter){
    var Strategy = $resource('data/strategies.json', {
      strategyId: '@id'
    });

    return Strategy;
  }]);
