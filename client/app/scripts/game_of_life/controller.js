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
      var liveCellNeighbours = 0;
      //var deadCellNeighbours = 0;
      for(var i=0; i<$scope.matrix.length; i++) {
          for(var j=0; j<$scope.matrix[i].length; j++){
              if($scope.matrix[i][j] === '*'){
                  liveCellNeighbours = liveCellNeighbours + findRowNeighbours(i,j,'*');
                  liveCellNeighbours = liveCellNeighbours + findColNeighbours(i,j,'*');
                  liveCellNeighbours = liveCellNeighbours + findDiagonalNeighbours(i,j,'*');
              }
              //else{
              //    deadCellNeighbours = deadCellNeighbours + findRowNeighbours(i,j,'.');
              //    deadCellNeighbours = deadCellNeighbours + findColNeighbours(i,j,'.');
              //    deadCellNeighbours = deadCellNeighbours + findDiagonalNeighbours(i,j,'.');
              //}

              killCellFirstCase(liveCellNeighbours, i, j);
              killCellSecondCase(liveCellNeighbours, i, j);
          }
      }
  };

  $scope.toggle = function(){
     $scope.aliveCell(0,0);
  };

  $scope.initMatrix(4,8);
  $scope.aliveCell(1,4);
  $scope.aliveCell(2,4);
  $scope.aliveCell(2,3);

  function findRowNeighbours(row,col,liveOrDead){
      var neighbours = 0;
      if($scope.matrix[row][col-1] === liveOrDead){
          neighbours ++;
      }

      if($scope.matrix[row][col+1] === liveOrDead){
          neighbours ++;
      }
      return neighbours;
  }

  function findColNeighbours(row,col,liveOrDead){
      var neighbours = 0;
      if($scope.matrix[row+1][col] === liveOrDead){
          neighbours ++;
      }

      if($scope.matrix[row-1][col] === liveOrDead){
          neighbours ++;
      }
      return neighbours;
  }

  function findDiagonalNeighbours(row,col, liveOrDead){
      var neighbours = 0;
      if($scope.matrix[row-1][col-1] === liveOrDead){
          neighbours ++;
      }

      if($scope.matrix[row-1][col+1] === liveOrDead){
          neighbours ++;
      }

      if($scope.matrix[row+1][col-1] === liveOrDead){
          neighbours ++;
      }

      if($scope.matrix[row+1][col+1] === liveOrDead){
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
