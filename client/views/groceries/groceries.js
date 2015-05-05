'use strict';

angular.module('groceryList')
.controller('GroceryCtrl', function($window, $scope, Grocery){
  $scope.food = {};
  //
  $scope.add = function(food){
    Grocery.add(food)
    .then(function(){
      //Add to the array of grocery list
    })
    .catch(function(){
      $window.swal({title: 'Error', text: 'There was a problem adding your food item. Please try again.', type: 'error'});
    });
  };
  //
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
