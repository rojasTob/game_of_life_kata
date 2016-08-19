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

        $scope.analyze_alive_cells = function () {

            _($scope.matrix).each(function(row,index_row){
                _(row).each(function(col,index_col){
                    if (col === '*' && can_operate_with_this_cell(index_row,index_col)) {
                        var neighbours = 0;
                        neighbours = find_neighbours_number(index_row, index_col);
                        kill_cell(neighbours, index_row, index_col);
                    }
                });
            });
        };

        $scope.analyze_dead_cells = function () {

            _($scope.matrix).each(function(row,index_row){
                _(row).each(function(col,index_col){
                    if (col === '.' && can_operate_with_this_cell(index_row,index_col)) {
                        var neighbours = 0;
                        neighbours = find_neighbours_number(index_row, index_col);
                        alive_cell(neighbours, index_row, index_col);
                    }
                });
            });
        };

        $scope.next_generation = function () {
            $scope.matrix_clone = [];
            $scope.clone_matrix();
            $scope.analyze_alive_cells();
            $scope.analyze_dead_cells();
            $scope.matrix = $scope.matrix_clone;
        };

        $scope.init_matrix(18,11);
        $scope.marked_positions = [{row: 4, col: 5},{row: 5, col: 5},{row: 6, col: 4},{row: 6, col: 6},{row: 7, col: 5},
                                  {row: 8, col: 5},{row: 9, col: 5},{row: 10, col: 5},{row: 11, col: 4},{row: 11, col: 6},
                                  {row: 12, col: 5},{row: 13, col: 5}];

        function can_operate_with_this_cell(row,col){
            return (can_add_and_substract_column(col) && can_add_and_substract_row(row));
        }

        function can_add_and_substract_column(col){
            var maxColumns = $scope.matrix[0].length;
            var addColumn = col+1 ;
            var substractColumn = col-1;

            return (substractColumn > -1 && addColumn < maxColumns);
        }

        function can_add_and_substract_row(row){
            var maxRows = $scope.matrix.length;
            var addRow = row+1 ;
            var substractRow = row-1;

            return (substractRow > -1 && addRow < maxRows);
        }

        function find_neighbours_number(row,col){
            var neighbours = 0;
            var position_neighbours = [{row: row, col: (col+1)},{row: row, col: (col-1)},
                                      {row: (row-1), col: col},{row: (row+1), col: col},
                                      {row: (row-1), col: (col-1)},{row: (row-1), col: (col+1)},{row: (row+1), col: (col-1)},{row: (row+1), col: (col+1)}];

            _(position_neighbours).each(function(position_neighbour){
                if(has_neighbours(position_neighbour.row,position_neighbour.col)){
                    neighbours ++;
                }
            });

            return neighbours;
        }

        function has_neighbours(row,col){
            return ($scope.matrix[row][col] === '*') ;
        }

        function kill_cell(neighbours, row, col) {
            if (neighbours < 2) {
                $scope.matrix_clone[row][col] = '.';
            }else if(neighbours > 3 ){
                $scope.matrix_clone[row][col] = '.';
            }
        }

        function alive_cell(neighbours, row, col){
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
