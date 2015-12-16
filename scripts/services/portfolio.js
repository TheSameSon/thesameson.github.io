'use strict';

angular.module('returnBoostApp')
  .factory('Portfolio', ['$resource', function($resource){
    var Portfolio = $resource('data/portfolios.json', {
      portfolioId: '@id'
    });

    return Portfolio;
  }])
