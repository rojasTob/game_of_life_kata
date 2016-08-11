'use strict';

angular.module('App', [
  'ngRoute',
  'Game_of_life',
  'Fizz_Buzz'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'scripts/main/views/dashboard.html',
  });
});
