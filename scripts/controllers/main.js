'use strict';

angular.module('returnBoostApp')
  .controller('MainCtrl', ['$scope', function ($scope){

    $scope.stOrder = 'name';
    $scope.stReverse = false;

    $scope.orderStrategy = function (prop) {
      if ($scope.stOrder === prop) {
        $scope.stReverse = !$scope.stReverse;
      } else {
        $scope.stReverse = false;
        $scope.stOrder = prop;
      }
    }
  }]);
