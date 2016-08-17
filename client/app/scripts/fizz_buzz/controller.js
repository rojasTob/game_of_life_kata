'use strict';

angular.module('Fizz_Buzz')
    .controller('fizz_buzz', function ($scope, _) {

        $scope.controller_loaded = 'Fizz Buzz loaded';
        $scope.top_number = 1;
        $scope.results_game = [];

        $scope.generate_numbers = function(){
            $scope.results_game = [];

            _(_.range($scope.top_number)).each(function(number){
                $scope.results_game[number] = $scope.analyze_result(number+1);
            });
        };

        $scope.divisible_by_three = function(number){
            return ((number % 3) === 0);
        };

        $scope.divisible_by_five = function(number){
            return ((number % 5) === 0);
        };

        $scope.analyze_result = function(number){
            var result = '';

            if($scope.divisible_by_three(number)){
                result = result.concat('Fizz');
            }

            if($scope.divisible_by_five(number)){
                result = result.concat('Buzz');
            }

            return result || number.toString();
        };
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/fizz_buzz', {
                templateUrl: 'scripts/fizz_buzz/views/fizz_buzz.html',
                controller: 'fizz_buzz'
            });
    });
