'use strict';

angular.module('Game_of_life')
    .controller('game_of_life', function ($scope, _) {

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
                $scope.matrixClone[row] = _($scope.matrix[row]).clone();
            }
        };

        $scope.next_generation = function () {
            $scope.matrixClone = [];
            $scope.cloneMatrix();
            $scope.analyzeAliveCells();
            $scope.analyzeDeadCells();
            $scope.matrix = $scope.matrixClone;
        };

        /*blinker(period 2)*/
        //$scope.initMatrix(5,5);
        //$scope.aliveCell(1,2);
        //$scope.aliveCell(2,2);
        //$scope.aliveCell(3,2);

        /*toad (period 2)*/
        //$scope.initMatrix(6,6);
        //$scope.aliveCell(2,2);
        //$scope.aliveCell(2,3);
        //$scope.aliveCell(2,4);
        //$scope.aliveCell(3,1);
        //$scope.aliveCell(3,2);
        //$scope.aliveCell(3,3);

        /*pentadeclathon(period 15)*/
        $scope.initMatrix(18,11);
        $scope.aliveCell(4,5);
        $scope.aliveCell(5,5);
        $scope.aliveCell(6,4);
        $scope.aliveCell(6,6);
        $scope.aliveCell(7,5);
        $scope.aliveCell(8,5);
        $scope.aliveCell(9,5);
        $scope.aliveCell(10,5);
        $scope.aliveCell(11,4);
        $scope.aliveCell(11,6);
        $scope.aliveCell(12,5);
        $scope.aliveCell(13,5);


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
