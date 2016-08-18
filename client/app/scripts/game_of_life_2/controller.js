'use strict';

angular.module('Game_of_life_2')
    .controller('game_of_life_2',function($scope, _){

        $scope.controller_loaded = 'Game of life 2 loaded!';
        $scope.matrix = [];
        $scope.marked_positions =[];

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


    })
    .config(function($routeProvider){
        $routeProvider.when('/game_of_life_2',{
            templateUrl: 'scripts/game_of_life_2/views/game_of_life_2.html',
            controller: 'game_of_life_2'
        });

    });
