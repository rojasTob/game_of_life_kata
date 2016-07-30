'use strict';

angular.module('Game_of_life')
    .controller('game_of_life', function ($scope) {

        $scope.controller_loaded = 'Game of life loaded!';
        $scope.matrix = [];
        $scope.matrixClone = [];

        $scope.initMatrix = function (rows, cols) {
            var matrix = [];
            for (var row = 0; row < rows; row++) {
                var matrixRow = [];
                for (var col = 0; col < cols; col++) {
                    matrixRow [col] = '.';
                }
                matrix[row] = matrixRow;
            }
            $scope.matrix = matrix;
        };

        $scope.aliveCell = function (row, col) {
            $scope.matrix[row][col] = '*';
        };

        $scope.analyzeAliveCells = function () {
            for (var row = 0; row < $scope.matrix.length; row++) {
                for (var col = 0; col < $scope.matrix[row].length; col++) {
                    if ($scope.matrix[row][col] === '*' && canOperateWithThisCell(row,col)) {
                        var neighbours = 0;
                        neighbours = findRowNeighbours(row, col) + findColNeighbours(row, col) + findDiagonalNeighbours(row, col);
                        killCell(neighbours, row, col);
                    }
                }
            }
        };

        $scope.analyzeDeadCells = function () {
            for (var row = 0; row < $scope.matrix.length; row++) {
                for (var col = 0; col < $scope.matrix[row].length; col++) {
                    if ($scope.matrix[row][col] === '.' && canOperateWithThisCell(row,col)) {
                        var neighbours = 0;
                        neighbours = findRowNeighbours(row, col) + findColNeighbours(row, col) + findDiagonalNeighbours(row, col);
                        aliveCell(neighbours, row, col);
                    }
                }
            }
        };

        $scope.cloneMatrix = function(){
            for (var row = 0; row < $scope.matrix.length; row++) {
                var rowClone = [];
                for(var col = 0 ; col< $scope.matrix[row].length ; col++){
                    rowClone[col] = $scope.matrix[row][col];
                }
                $scope.matrixClone[row] = rowClone;
            }
        };

        $scope.nextGeneration = function () {
            $scope.matrixClone = [];
            $scope.cloneMatrix();
            $scope.analyzeAliveCells();
            $scope.analyzeDeadCells();
            $scope.matrix = $scope.matrixClone;
        };

        $scope.initMatrix(5,5);
        $scope.aliveCell(1,2);
        $scope.aliveCell(2,2);
        $scope.aliveCell(3,2);

        function canOperateWithThisCell(row,col){
            return (canAddAndSubstractAColumn(col) && canAddAndSubstractARow(row));
        }

        function canAddAndSubstractAColumn(col){
            var maxColumns = $scope.matrix[0].length;
            var addColumn = col+1 ;
            var substractColumn = col-1;

            return (substractColumn > -1 && addColumn < maxColumns);
        }

        function canAddAndSubstractARow(row){
            var maxRows = $scope.matrix.length;
            var addRow = row+1 ;
            var substractRow = row-1;

            return (substractRow > -1 && addRow < maxRows);
        }

        function findRowNeighbours(row, col) {
            var neighbours = 0;
            if ($scope.matrix[row][col - 1] === '*') {
                neighbours++;
            }

            if ($scope.matrix[row][col + 1] === '*') {
                neighbours++;
            }
            return neighbours;
        }

        function findColNeighbours(row, col) {
            var neighbours = 0;
            if ($scope.matrix[row + 1][col] === '*') {
                neighbours++;
            }

            if ($scope.matrix[row - 1][col] === '*') {
                neighbours++;
            }
            return neighbours;
        }

        function findDiagonalNeighbours(row, col) {
            var neighbours = 0;
            if ($scope.matrix[row - 1][col - 1] === '*') {
                neighbours++;
            }

            if ($scope.matrix[row - 1][col + 1] === '*') {
                neighbours++;
            }

            if ($scope.matrix[row + 1][col - 1] === '*') {
                neighbours++;
            }

            if ($scope.matrix[row + 1][col + 1] === '*') {
                neighbours++;
            }
            return neighbours;
        }

        function killCell(neighbours, row, col) {
            if (neighbours < 2) {
                $scope.matrixClone[row][col] = '.';
            }else if(neighbours > 3 ){
                $scope.matrixClone[row][col] = '.';
            }
        }

        function aliveCell(neighbours, row, col){
            if(neighbours === 3 ){
                $scope.matrixClone[row][col] = '*';
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
