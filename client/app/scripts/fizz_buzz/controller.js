'use strict';

angular.module('Fizz_Buzz')
    .controller('fizz_buzz', function ($scope) {

        $scope.controller_loaded = 'Fizz Buzz loaded';

    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/fizz_buzz', {
                templateUrl: 'scripts/fizz_buzz/views/fizz_buzz.html',
                controller: 'fizz_buzz'
            });
    });
