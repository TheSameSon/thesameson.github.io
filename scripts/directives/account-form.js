'use strict';

angular.module('returnBoostApp')
  .directive('accountForm', ['$timeout', 'ModalService', function ($timeout, ModalService) {
    return {
      restrict: 'E',
      scope: {
        onRegister: '&',
        onLogin: '&',
        onReset: '&'
      },
      replace: true,
      templateUrl: 'scripts/directives/views/account-form.html',
      link: function (scope, element, attrs) {
        scope.showTermsAndConditions = function () {
          ModalService.showModal({
            controller: 'ModalCtrl',
            template: '<bootstrap-modal modal-title="\'Terms & Conditions\'"> <ng-include src="\'views/terms-conditions.html\'"></ng-include> </bootstrap-modal>',
          }).then(function(modal) {
            // we need $timeout here to ensure the modal's DOM is appended.
            // the third parameter is to prevent $digest cycle
            $timeout(function() {
              modal.element.modal();
            }, 0, false);
          });
        }

        scope.register = function () {
          // do something ...

          scope.onRegister(false);
        }

        scope.login = function () {
          // do something ...

          scope.onLogin(false);
        }

        scope.reset = function () {
          // do something ...

          scope.onReset(false);
        }
      }
    };
  }]);
