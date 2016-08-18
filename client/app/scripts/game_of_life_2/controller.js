'use strict';

angular.module('Game_of_life_2')
    .controller('game_of_life_2',function($scope, _){

        $scope.controller_loaded = 'Game of life loaded!';
        $scope.matrix = [];

        $scope.initMatrix = function(rows, cols){
            $scope.matrix = _.range(rows).map(function () {
                return _.range(cols).map(function () {
                    return '.';
                });
            });
        };

    })
    .config(function($routeProvider){
        $routeProvider.when('/game_of_life_2',{
            templateUrl: 'scripts/game_of_life_2/views/game_of_life_2.html',
            controller: 'game_of_life_2'
        });

    });
