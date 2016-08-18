'use strict';

angular.module('Game_of_life_2')
    .controller('game_of_life_2',function($scope, _){

        $scope.controller_loaded = 'Game of life 2 loaded!';
        $scope.matrix = [];
        $scope.marked_positions =[];
        $scope.matrix_clone = [];

        $scope.init_matrix = function(rows, cols){
            $scope.matrix = _(rows).range().map(function () {
                return _(cols).range().map(function () {
                    return '.';
                });
            });
        };

        $scope.mark_positions = function(){
            _($scope.marked_positions).each(function(position){
                $scope.matrix[position.row][position.col] = '*';
            });
        };

        $scope.clone_matrix = function(){
            _($scope.matrix).each(function(row){
                $scope.matrix_clone.push(_(row).clone());
            });
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

        $scope.next_generation = function () {
            $scope.matrix_clone = [];
            $scope.clone_matrix();
            $scope.analyzeAliveCells();
            $scope.analyzeDeadCells();
            $scope.matrix = $scope.matrix_clone;
        };

        $scope.init_matrix(18,11);
        $scope.marked_positions = [{row: 4, col: 5},{row: 5, col: 5},{row: 6, col: 4},{row: 6, col: 6},{row: 7, col: 5},
                                  {row: 8, col: 5},{row: 9, col: 5},{row: 10, col: 5},{row: 11, col: 4},{row: 11, col: 6},
                                  {row: 12, col: 5},{row: 13, col: 5}];

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
                $scope.matrix_clone[row][col] = '.';
            }else if(neighbours > 3 ){
                $scope.matrix_clone[row][col] = '.';
            }
        }

        function aliveCell(neighbours, row, col){
            if(neighbours === 3 ){
                $scope.matrix_clone[row][col] = '*';
            }
        }

    })
    .config(function($routeProvider){
        $routeProvider.when('/game_of_life_2',{
            templateUrl: 'scripts/game_of_life_2/views/game_of_life_2.html',
            controller: 'game_of_life_2'
        });

    });
