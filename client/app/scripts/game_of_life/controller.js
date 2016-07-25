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

  $scope.analyzeMatrix = function(){
      var neighbours = 0;
      for(var i=0; i<$scope.matrix.length; i++) {
          for(var j=0; j<$scope.matrix[i].length; j++){
              if($scope.matrix[i][j] === '*'){
                  neighbours = neighbours + findRowNeighbours(i,j);
                  neighbours = neighbours + findColNeighbours(i,j);
                  neighbours = neighbours + findDiagonalNeighbours(i,j);
              }
              killCellFirstCase(neighbours, i, j);
              killCellSecondCase(neighbours, i, j);
          }
      }
  };

  function findRowNeighbours(row,col){
      var neighbours = 0;
      if($scope.matrix[row][col-1] === '*'){
          neighbours ++;
      }

      if($scope.matrix[row][col+1] === '*'){
          neighbours ++;
      }
      return neighbours;
  }

  function findColNeighbours(row,col){
      var neighbours = 0;
      if($scope.matrix[row+1][col] === '*'){
          neighbours ++;
      }

      if($scope.matrix[row-1][col] === '*'){
          neighbours ++;
      }
      return neighbours;
  }

  function findDiagonalNeighbours(row,col){
      var neighbours = 0;
      if($scope.matrix[row-1][col-1] === '*'){
          neighbours ++;
      }

      if($scope.matrix[row-1][col+1] === '*'){
          neighbours ++;
      }

      if($scope.matrix[row+1][col-1] === '*'){
          neighbours ++;
      }

      if($scope.matrix[row+1][col+1] === '*'){
          neighbours ++;
      }

      return neighbours;
  }

  function killCellFirstCase(neighbours, row, col){
      if(neighbours < 2 ){
          $scope.matrix[row][col] = '.';
      }
  }

  function killCellSecondCase(neighbours, row, col){
      if(neighbours > 3 ){
          $scope.matrix[row][col] = '.';
      }
  }



})
.config(function ($routeProvider) {
  $routeProvider
  .when('/game_of_life', {
    templateUrl: 'scripts/game_of_life/views/game_of_life.html',
    controller: 'game_of_life'
  });
});
