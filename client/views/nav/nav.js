'use strict';

angular.module('groceryList')
.controller('NavCtrl', function($rootScope, $scope, $state, User, $http, $window){

  $scope.afAuth.$onAuth(function(data){
    if(data){
      $rootScope.activeUser = data;
      $rootScope.displayName = getDisplayName(data);
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      User.findOrCreate()
      .then(function(){
       $state.go('grocery');
      })
      .catch(function(){
       $window.swal({title: 'Registration Error', text: 'There was a problem with your registration. Please try again.', type: 'error'});
      });
    }else{
      $rootScope.activeUser = null;
      $rootScope.displayName = null;
      $http.defaults.headers.common.Authorization = null;
    }
    $state.go('home');
  });

  $scope.logout = function(){
    User.logout();
    $state.go('home');
  };
  function getDisplayName(data){
  switch(data.provider){
    case 'password':
    return data.password.email;
    case 'github':
    return data.github.displayName;
    case 'twitter':
    return data.twitter.displayName;
    case 'facebook':
    return data.facebook.displayName;
    case 'google':
    return data.google.displayName;
  }
}
});
