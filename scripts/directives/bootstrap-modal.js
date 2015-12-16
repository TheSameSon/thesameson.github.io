'use strict';

angular.module('returnBoostApp')
  .directive('bootstrapModal', [function () {
    return {
      scope: {
        title: '=modalTitle'
      },
      replace: true,
      templateUrl: 'scripts/directives/views/bootstrap-modal.html',
      transclude: true
    }
  }]);
