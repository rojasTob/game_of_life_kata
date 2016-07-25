'use strict';

angular.module('Game_of_life')
.controller('game_of_life', function ($scope) {

  $scope.controller_loaded = 'Game of life loaded!';
  $scope.matrix = [];

  $scope.initMatrix = function (rows,cols){
      var matrix = [];
      for(var i=0; i<rows; i++) {
          var row = [];
          for(var j=0; j<cols; j++){
              row [j] = '.';
          }
          matrix[i] = row;
      }
      $scope.matrix = matrix;
  };

  $scope.aliveCell = function(row, col){
      $scope.matrix[row][col] = '*';
  };



})
.config(function ($routeProvider) {
  $routeProvider
  .when('/game_of_life', {
    templateUrl: 'scripts/game_of_life/views/game_of_life.html',
    controller: 'game_of_life'
  });
});
