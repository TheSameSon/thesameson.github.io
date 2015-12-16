'use strict';

angular.module('returnBoostApp')
  .controller('ModalCtrl', ['$scope', 'close', function ($scope, close) {
    $scope.closeModal = function(result) {
      close(result);

      angular.element('body').removeClass('modal-open');
    }
  }]);
