/**
 * Created by yasa on 02/12/14.
 */
'use strict';

/**
 * @ngdoc service
 * @name posytifApp.service:Player
 * @description
 * # Player
 * Track player for posytifApp
 */
angular.module('posytifApp')
  .controller('UserCtrl', function ($scope, AuthService) {

    $scope.oAuthLogin = function(provider){
      handleLoginPromise(AuthService.thirdPartyLogin(provider));
    };

    $scope.passwordLogin = function(userData){
      handleLoginPromise(AuthService.passwordLogin(userData));
    };

    $scope.register = function(userData){
      handleLoginPromise(AuthService.createUserAndLogin(userData));
    };

    $scope.logout = function(){
      AuthService.logout();
      $scope.user = null;
    };

    function handleLoginPromise(loginPromise){
      loginPromise.then(function(user){
        $scope.user = user;
      }).catch(function(error){
        if(error && error.code === 'USER_CANCELLED'){
          return;
        }
        alert('Authentication Failed.');
        console.error(error);
      });
    }

  });
