'use strict';

/**
 * @ngdoc function
 * @name returnBoostApp.controller:FindStrategiestCtrl
 * @description
 * # FindStrategiestCtrl
 * Controller of the returnBoostApp
 */
angular.module('returnBoostApp')
  .controller('FollowStrategiesCtrl', ['$scope', 'dataStorage', 'navigation', 'chart', 'portfoliosResolve', 'ModalService', '$timeout', function ($scope, dataStorage, navigation, chart, portfoliosResolve, ModalService, $timeout) {

    chart.performance(dataStorage.selectedStrategies).then(function (result) {
      $scope.performanceChart = result;
    });

    chart.risk(dataStorage.selectedStrategies).then(function (result) {
      $scope.riskChart = result;
    });

    chart.allocation(dataStorage.selectedStrategies).then(function (result) {
      $scope.allocationChart = result;
    });

    $scope.selectedStrategies = dataStorage.selectedStrategies;
    $scope.investment = dataStorage.investment;

    $scope.portfolios = portfoliosResolve;

    $scope.portfolioSum = 0;

    angular.forEach($scope.portfolios, function (portfolio) {
      $scope.portfolioSum += portfolio.price * portfolio.shares;
    });

    $scope.Math = window.Math;

    $scope.goBack = function () {
      navigation.goStep(2);
    };

    $scope.subscribe = function () {
      ModalService.showModal({
        controller: 'ModalCtrl',
        template: '<bootstrap-modal> <account-form on-register="closeModal(result)" on-login="closeModal(result)" on-reset="closeModal(result)" /> </bootstrap-modal>',
      }).then(function(modal) {
        // we need $timeout here to ensure the modal's DOM is appended.
        // the third parameter is to prevent $digest cycle
        $timeout(function() {
          modal.element.modal();
        }, 0, false);
      });
    }
  }]);
