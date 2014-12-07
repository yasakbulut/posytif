// Controller for the login-related area.

// Uses `AuthService`.
'use strict';
angular.module('posytifApp')
  .controller('UserCtrl', function ($scope, AuthService) {

    // Expose available loginProviders, so that we can iterate over them.
    $scope.loginProviders = [
      'facebook',
      'twitter',
      'google'
    ];

    // Expose the oAuth login functionality. Calls the relevant function in `AuthService`, then handles the promise
    // in a way that's consistent with other login types, if there is one.
    $scope.oAuthLogin = function(provider){
      handleLoginPromise(AuthService.thirdPartyLogin(provider));
    };

    // Expose the logout functionality.
    $scope.logout = function(){
      AuthService.logout();
      $scope.user = null;
    };

    // On controller initialization, check with firebase to see if the user is already logged in.
    // This allows login state to persist across page refreshes, and application revisits.
    AuthService.checkPersistentLoginState().then(function(user){
        $scope.user = user;
    });

    // Handle promises returned by login.
    function handleLoginPromise(loginPromise){
      loginPromise.then(function(user){
        // If login is successful, expose the user to the scope.
        $scope.user = user;
      }).catch(function(error){
        // If user cancels, do nothing.
        if(error && error.code === 'USER_CANCELLED'){
          return;
        }
        // But, if another error occurs, alert the user.
        swal('Authentication Failed.');
      });
    }

  });
