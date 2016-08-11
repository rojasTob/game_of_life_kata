'use strict';

angular.module('Fizz_Buzz')
    .controller('fizz_buzz', function ($scope) {

        $scope.controller_loaded = 'Fizz Buzz loaded';
        $scope.top_number = 0;
        $scope.resultsGame = [];

        $scope.generate_numbers = function(){
            for(var position = 0 ; position < $scope.top_number ; position++){
                var number = position + 1;
                $scope.resultsGame[position] = $scope.analyzeResult(number);
            }
        };

        $scope.divisible_by_three = function(number){
            return ((number % 3) === 0);
        };

        $scope.divisible_by_five = function(number){
            return ((number % 5) === 0);
        };

        $scope.analyzeResult = function(number){
            var result = '';
            if($scope.divisible_by_three(number)){
                result = result.concat('Fizz');
            }

            if($scope.divisible_by_five(number)){
                result = result.concat('Buzz');
            }

            return result ? result : number;
        };



    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/fizz_buzz', {
                templateUrl: 'scripts/fizz_buzz/views/fizz_buzz.html',
                controller: 'fizz_buzz'
            });
    });
