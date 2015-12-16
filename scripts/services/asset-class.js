'use strict';

angular.module('returnBoostApp')
  .factory('AssetClass', ['$resource', function($resource){
    var AssetClass = $resource('data/asset-classes.json', {
      assetClassIs: '@id'
    });

    return AssetClass;
  }]);
