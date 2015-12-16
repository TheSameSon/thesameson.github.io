'use strict';

angular.module('returnBoostApp')
  .directive('riskIcon', [function () {
    return {
      // replace: true,
      sctrict: 'EAC',
      template: '<i class="fa fa-warning {{iconClass}}"></i> <span class="text-uppercase" ng-bind="key"></span> <span class="text-muted" ng-bind="note"></span>',
      scope: {
        risk: '@'
      },
      link: function (scope) {
        scope.key;
        scope.note;
        scope.iconClass;

        scope.$watch('risk', function (value) {
          var parts = value.split(' ');

          scope.key = parts[0];
          scope.note = parts[1];

          if (scope.key === 'low') {
            scope.iconClass = 'txtc-info';
          } else if (scope.key === 'mid') {
            scope.iconClass = 'txtc-success';
          } else if (scope.key === 'high') {
            scope.iconClass = 'txtc-danger';
          }
        });
      }
    }
  }]);
