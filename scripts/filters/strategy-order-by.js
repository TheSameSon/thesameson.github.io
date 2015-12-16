'use strict';

angular.module('returnBoostApp')
  .filter('strategyOrderBy', ['$filter', function($filter) {

    function strategyOrder(risk) {
      switch(risk) {
        case 'low':
          return 1;

        case 'mid':
          return 2;

        case 'high':
          return 3;
      }
    }

    return function (strategies, field, reverse) {
      var filtered = [];

      angular.forEach(strategies, function(strategy) {
        filtered.push(strategy);
      });

      if (field === 'risk') {
        filtered.sort(function (a, b) {
          if (reverse) {
            return  (strategyOrder(a.risk) > strategyOrder(b.risk) ? 1 : -1);
          } else {
            return  (strategyOrder(a.risk) > strategyOrder(b.risk) ? -1 : 1);
          }
        });
      } else {
        filtered = $filter('orderBy')(filtered, field, reverse);
      }

      return filtered;
    };
  }]);
