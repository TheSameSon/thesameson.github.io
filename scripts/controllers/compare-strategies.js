'use strict';

/**
 * @ngdoc function
 * @name returnBoostApp.controller:FindStrategiestCtrl
 * @description
 * # FindStrategiestCtrl
 * Controller of the returnBoostApp
 */
angular.module('returnBoostApp')
  .controller('CompareStrategiesCtrl', ['$scope', 'chart', 'dataStorage', 'assetClassesResolve', 'helper', 'navigation', function ($scope, chart, dataStorage, assetClassesResolve, helper, navigation) {

    $scope.assetClasses = assetClassesResolve;
    $scope.selectedAssetClasses = dataStorage.selectedAssetClasses;
    $scope.selectedStrategies = dataStorage.selectedStrategies;

    $scope.arrayIndexOf = helper.arrayIndexOf;

    chart.performance(dataStorage.selectedStrategies).then(function (result) {
      $scope.performanceChart = result;
    });

    chart.risk(dataStorage.selectedStrategies).then(function (result) {
      $scope.riskChart = result;
    });

    $scope.selectStrategy = function (strategy) {
      dataStorage.selectedStrategy = strategy;

      navigation.stepsEnabled = [0, 1, 2];

      navigation.goStep(2);
    };

    $scope.back = function () {
      navigation.goStep(0);
    };
  }]);
