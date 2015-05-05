'use strict';

angular.module('groceryList')
.controller('GroceryCtrl', function($window, $scope, Grocery){
  $scope.food = {};

  Grocery.getFoodList()
  .then(function(response){
   $scope.foods = response.data.foods;
  });

  $scope.destroy = function(food){
   Grocery.destroy(food)
   .then(function(response){
    $window._.remove($scope.foods, function(f){
     return f._id === food._id;
    });
   });
  };

  $scope.add = function(food){
    Grocery.add(food)
    .then(function(response){
      $scope.foods.push(response.data);
    })
    .catch(function(){
      $window.swal({title: 'Error', text: 'There was a problem adding your food item. Please try again.', type: 'error'});
    });
  };

  $scope.editFood = function(food){
   $scope.food = food;
    Grocery.getFoodList()
    .then(function(foodList){
     $scope.foods = foodList.data.foods;
    });
 };

  $scope.toggleCheckbox = function(food){
   Grocery.toggle(food)
   .then(function(response){
    console.log('response.data: ', response.data);
    // var foodItem = $window._.find($scope.foods, function(f){
    //  return f._id === response.data._id;
    // });
   });
  };

  $scope.camOn = function(){
    $scope.webcamOn = true;
    $window.Webcam.set({
      width: 320,
      height: 240,
      destWidth: 640,
      destHeight: 480,
      imageFormat: 'png',
      jpegQuality: 90,
    });
    $window.Webcam.attach('#camera');
    };

  $scope.takeSnapshot = function(){
    $window.Webcam.snap(function(dataUri){
      $scope.food.photo = dataUri;
    });
  };

  $scope.camOff = function(){
    $scope.webcamOn = false;
    $window.Webcam.reset();
  };

});
