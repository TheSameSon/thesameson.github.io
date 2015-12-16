'use strict';

/**
 * @ngdoc function
 * @name returnBoostApp.controller:FindStrategiestCtrl
 * @description
 * # FindStrategiestCtrl
 * Controller of the returnBoostApp
 */
angular.module('returnBoostApp')
  .controller('CustomizeStrategiesCtrl', ['$scope', 'dataStorage', 'navigation', function ($scope, dataStorage, navigation) {
    $scope.selectedStrategy = dataStorage.selectedStrategy;
    $scope.selectedAssetClasses = dataStorage.selectedAssetClasses;
    $scope.investment = dataStorage.investment;

    $scope.next = false;

    $scope.goBack = function () {
      navigation.stepsEnabled = [0, 1, 2]; // TODO: move 'stepsEnabled' defination to followed step controller, i.e. 2

      navigation.goStep(2);
    }

    $scope.next = false;

    $scope.$watch('customizeForm.$valid', function () {
      $scope.next = $scope.customizeForm.$valid;
    });

    $scope.$watch('next', function () {
      if ($scope.next) {
        navigation.stepsEnabled = [0, 1, 2, 3];
      } else {
        navigation.stepsEnabled = [0, 1, 2];
      }
    });

    $scope.goBack = function () {
      navigation.goStep(1);
    };

    $scope.goNext = function () {
      if (!$scope.next) return false;

      dataStorage.investment = $scope.investment;

      navigation.stepsEnabled = [0, 1, 2, 3];

      navigation.goStep(3);
    };
  }]);
