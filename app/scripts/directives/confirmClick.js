/**
 * Created by yasa on 04/12/14.
 */
angular.module('posytifApp')
  .directive('ngConfirmClick', [
  function(){
    return {
      link: function (scope, element, attr) {
        var msg = attr.ngConfirmClick || "Are you sure?";
        var clickAction = attr.confirmedClick;
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
  }])
