'use strict';

angular.module('returnBoostApp')
  .directive('stepNav', ['navigation', 'dataStorage', '$interval', function (navigation, dataStorage, $interval) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/views/step-nav.html',
      link: function (scope, element, attrs) {
        scope.steps = navigation.getSteps();

        scope.stepsEnabled = [];
        scope.$watch(function() { return navigation.stepsEnabled }, function () {
          scope.stepsEnabled = navigation.stepsEnabled;
        })

        scope.current;

        var updateCurrent = function (index) {
          scope.current = index;
        }

        scope.$on('step:initiated', function () {
          updateCurrent(navigation.getCurrentStep());
        });

        scope.$on('step:changed', function () {
          updateCurrent(navigation.getCurrentStep());
        });

        scope.goStep = function (index) {
          navigation.goStep(index);
        }
      }
    }
  }]);
