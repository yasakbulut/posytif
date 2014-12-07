// Directive used to display confirmation messages before certain actions.

angular.module('posytifApp')
  .directive('ngConfirmClick', [
  function(){
    return {
      link: function (scope, element, attr) {
        // Get the confirmation message from the element's attributes. Default message is: `Are you sure?`
        var msg = attr.ngConfirmClick || "Are you sure?";
        // Get the aßction to be performed from the element's attributes.
        var clickAction = attr.confirmedClick;

        // On click, show an alert box (using `sweetalert.js`), then evaluate the requested action
        // in the element's scope.
        element.bind('click',function (event) {
          swal({
              title: "Are you sure?",
              text: msg,
              type: "warning",
              showCancelButton: true,
              confirmButtonClass: 'btn-flat',
              confirmButtonText: attr.confirmText,
              closeOnConfirm: true
            },
            function(){
              scope.$eval(clickAction);
            });
        });
      }
    };
}]);
