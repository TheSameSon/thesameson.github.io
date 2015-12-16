'use strict';

angular.module('helpers', [])
  .factory('helper', [function () {
    var helper = {};

    helper.arrayIndexOf = function (arr, obj) {
      for(var i = 0; i < arr.length; i++){
          if(angular.equals(arr[i], obj)){
              return i;
          }
      };

      return -1;
    }

    return helper;
  }])
