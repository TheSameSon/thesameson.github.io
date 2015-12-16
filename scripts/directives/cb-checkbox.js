'use strict';

angular.module('returnBoostApp')
  .directive('cbCheckbox', [function () {
    return {
      restrict: 'CA',
      link: function (scope, element, attrs) {
        var input = element.find('input[type="checkbox"]');

        function changeCallback() {
          if (input.prop('checked')) {
            element.addClass('checked');
          } else {
            element.removeClass('checked');
          }
        }

        // 'change' handler
        input.on('change', changeCallback);

        // initial setup
        changeCallback();
      }
    }
  }])
