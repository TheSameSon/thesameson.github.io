'use strict';

angular.module('returnBoostApp')
  .filter('hasAssetClass', [function () {
    return function (list, assetClasses) {
      var filterBy = assetClasses.map(function (item) {
        return item.key;
      });

      var filtered = [];

      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].asset_classes.length; j++) {
          if (filterBy.indexOf(list[i].asset_classes[j]) > -1 && filtered.indexOf(list[i]) < 0) {
            filtered.push(list[i]);
          }
        };
      };

      return filtered;
    }
  }]);
