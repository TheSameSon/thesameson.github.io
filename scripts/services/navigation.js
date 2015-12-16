'use strict';

angular.module('returnBoostApp')
  .factory('navigation', ['$state', '$rootScope', '$stateParams', '$timeout', function($state, $rootScope, $stateParams, $timeout){
    var navigation = {};

    var _steps = [],
      _current;

    angular.forEach($state.get(), function (state) {
      if (angular.isDefined(state.data) && angular.isDefined(state.data.step)) {
        _steps[state.data.step.index] = {
          name: state.data.step.name,
          stateName: state.name
        }
      }
    });

    var off = $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      for (var i = 0; i < _steps.length; i++) {
        if ($state.is(_steps[i].stateName)) {
          _current = i;
          break;
        }
      };

      $rootScope.$broadcast('step:initiated', _current);
      off(); // unbind callback
    });

    navigation.stepsEnabled = [0];

    navigation.getSteps = function () {
      return _steps;
    }

    navigation.getCurrentStep = function () {
      return _current;
    };

    navigation.goStep = function (index) {
      // var old = _current;

      if (angular.isUndefined(_steps[index])) return;

      $state.go(_steps[index].stateName);
    };

    $rootScope.$on('$stateChangeSuccess', function () {
      if (angular.isDefined($state.current.data) && angular.isDefined($state.current.data.step)) {
        _current = $state.current.data.step.index;

        $rootScope.$broadcast('step:changed', _current);
      }
    });

    return navigation;
  }])
