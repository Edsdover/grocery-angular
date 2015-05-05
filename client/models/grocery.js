'use strict';

angular.module('groceryList')
.factory('Grocery', function($http, nodeUrl){

  function Grocery(){
  }

  Grocery.add = function(food){
   return $http.post(nodeUrl + '/foods', food);
  };

  return Grocery;
});
