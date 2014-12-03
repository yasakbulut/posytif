'use strict';

/**
 * @ngdoc service
 * @name posytifApp.service:Player
 * @description
 * # Player
 * Track player for posytifApp
 */
angular.module('posytifApp')
  .factory('AuthService', function (Firebase, $q) {

    var loginStatus = {
      loggedIn: false,
      provider: '',
      uid: ''
    };

    var rootRef = new Firebase('https://posytif-data.firebaseio.com/auth/');


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

    var passwordLogin = function (userObj){
      var deferred = $q.defer();

      rootRef.authWithPassword(userObj, function (err, user){
        if (err) {
          deferred.reject(err);
        }
        if (user) {
          deferred.resolve(user);
          loginStatus.loggedIn = true;
          loginStatus.provider = 'password';
          loginStatus.uid = user.uid;
        }
      });

      return deferred.promise;
    };

    var createUser = function (userObj){
      var deferred = $q.defer();

      rootRef.createUser(userObj, function (err){
        if (!err) {
          deferred.resolve();
        }else{
          deferred.reject(err);
        }
      });

      return deferred.promise;
    };

    var createUserAndLogin = function(userObj){
      return createUser(userObj).then(function(){
        return passwordLogin(userObj);
      });
    };

    var logout = function(){
      rootRef.unauth();
      loginStatus.loggedIn = false;
    };

    var getUser = function(){
      return rootRef.getAuth();
    };

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

    var onLoginStatus = function(callback){
      rootRef.onAuth(callback);
    };

    return {
      thirdPartyLogin: thirdPartyLogin,
      passwordLogin: passwordLogin,
      createUserAndLogin: createUserAndLogin,
      logout: logout,
      getUser: getUser,
      checkPersistentLoginState: checkPersistentLoginState,
      onLoginStatus: onLoginStatus,
      loginStatus: loginStatus
    };

  });
