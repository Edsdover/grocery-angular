'use strict';

angular.module('groceryList')
.factory('Grocery', function($http, nodeUrl){

  function Grocery(){
  }

  Grocery.getFoodList = function(){
   return $http.get(nodeUrl + '/foods');
  };

  Grocery.add = function(food){
   return $http.post(nodeUrl + '/foods', food);
  };

  Grocery.save = function(food){
   return $http.put(nodeUrl + '/foods/' + food._id, food);
  };
  // Grocery.toggle = function(food){
  //  return $http.put(nodeUrl + '/foods/' + food._id, food);
  // };

  Grocery.destroy = function(food){
   return $http.delete(nodeUrl + '/foods/' + food._id);
  };

  return Grocery;
});
