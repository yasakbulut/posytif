// The authorization service.

// This service is a wrapper to the Firebase authorization service. All operations return promises using the `$q` service.
// Exposes the following properties:
// * thirdPartyLogin
// * logout
// * getUser
// * checkPersistentLoginState
// * onLoginStatus
// * loginStatus
// Read on for details on the exported properties.
'use strict';

angular.module('posytifApp')
  .factory('AuthService', function (Firebase, $q) {

    // The login status object, will be exposed to the clients.
    var loginStatus = {
      loggedIn: false,
      provider: '',
      uid: ''
    };

    // Construct an instance to connect to Firebase at the application's URL.
    var rootRef = new Firebase('https://posytif-data.firebaseio.com/auth/');

    // Log the user using the given OAuth provider. The providers supported by Firebase are:
    // * Facebook
    // * Twitter
    // * Google
    // * GitHub
    // On successful login, the login status object is updated.
    var thirdPartyLogin = function(provider){
      var deferred = $q.defer();

      rootRef.authWithOAuthPopup(provider, function (err,user) {
        if (err) {
          deferred.reject(err);
        }
        if (user) {
          deferred.resolve(user);
          loginStatus.loggedIn = true;
          loginStatus.provider = provider;
          loginStatus.uid = user.uid;
        }
      });

      return deferred.promise;
    };

    // Log the user out, and update the login status object.
    var logout = function(){
      rootRef.unauth();
      loginStatus.loggedIn = false;
    };

    // Get the user's details. //TODO: usage?
    var getUser = function(){
      return rootRef.getAuth();
    };

    // Check if the user has already logged in, and has an active session.
    var checkPersistentLoginState = function(){
      var deferred = $q.defer();

      rootRef.onAuth(function (user){
        if (user) {
          deferred.resolve(user);
          loginStatus.loggedIn = true;
          loginStatus.provider = user.provider;
          loginStatus.uid = user.uid;
        }else{
          deferred.reject('NOT_LOGGED_IN');
        }
      });

      return deferred.promise;
    };

    // Expose the firebase authorization status change event.
    var onLoginStatus = function(callback){
      rootRef.onAuth(callback);
    };

    return {
      thirdPartyLogin: thirdPartyLogin,
      logout: logout,
      getUser: getUser,
      checkPersistentLoginState: checkPersistentLoginState,
      onLoginStatus: onLoginStatus,
      loginStatus: loginStatus
    };

  });
