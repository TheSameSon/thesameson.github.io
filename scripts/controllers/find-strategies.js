'use strict';

/**
 * @ngdoc function
 * @name returnBoostApp.controller:FindStrategiestCtrl
 * @description
 * # FindStrategiestCtrl
 * Controller of the returnBoostApp
 */
angular.module('returnBoostApp')
  .controller('FindStrategiesCtrl', ['$scope', 'strategiesResolve', 'assetClassesResolve', 'dataStorage', '$filter', 'navigation', 'helper', 'ModalService', '$timeout', function ($scope, strategiesResolve, assetClassesResolve, dataStorage, $filter, navigation, helper, ModalService, $timeout) {

    // models
    $scope.assetClasses = assetClassesResolve;
    $scope.strategies = strategiesResolve;
    $scope.selectedAssetClasses = dataStorage.selectedAssetClasses;
    $scope.selectedStrategies = dataStorage.selectedStrategies;
/*
dataStorage.selectedStrategy = strategiesResolve[0];
dataStorage.selectedAssetClasses = [$scope.assetClasses[0], $scope.assetClasses[1]];
dataStorage.selectedStrategies = [$scope.strategies[0], $scope.strategies[1]];
dataStorage.investment = 10000;
navigation.stepsEnabled = [0,1,2,3];
console.log(dataStorage);
navigation.goStep(3);
*/

    // helpers
    $scope.arrayIndexOf = helper.arrayIndexOf;

    // actions
    $scope.toggleAssetClass = function (assetClass) {
      var index = $scope.arrayIndexOf($scope.selectedAssetClasses, assetClass);

      if (index > -1) {
        $scope.selectedAssetClasses.splice(index, 1);
      } else {
        $scope.selectedAssetClasses.push(assetClass);
      }

      // unselect strategies which hasn't selected asset classes
      $scope.selectedStrategies = $filter('hasAssetClass')($scope.selectedStrategies, $scope.selectedAssetClasses);

      // update storage
      dataStorage.selectedAssetClasses = $scope.selectedAssetClasses;

      if (!angular.equals(dataStorage.selectedStrategies, $scope.selectedStrategies)) {
        dataStorage.selectedStrategies = $scope.selectedStrategies;
      }
    };

    $scope.toggleStrategy = function (strategy) {
      var index = $scope.arrayIndexOf($scope.selectedStrategies, strategy);

      if (index > -1) {
        $scope.selectedStrategies.splice(index, 1);
      } else {
        $scope.selectedStrategies.push(strategy);
      }

       dataStorage.selectedStrategies = $scope.selectedStrategies;
    };

    // validate for next step
    $scope.next = false;

    $scope.$watch(function() { return dataStorage.selectedStrategies }, function () {
      if (dataStorage.selectedStrategies.length > 0) {
        $scope.next = true;

        if (!angular.equals(navigation.stepsEnabled, [0, 1])) {
          navigation.stepsEnabled = [0, 1];
        }
      } else {
        $scope.next = false;
        navigation.stepsEnabled = [0];
      }
    }, true);

    $scope.goNext = function () {
      if ($scope.next) {
        navigation.goStep(1);
      }
    }
  }]);
