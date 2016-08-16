'use strict';

angular.module('App', [
  'ngRoute',
  'Game_of_life',
  'Fizz_Buzz',
  'underscore'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'scripts/main/views/dashboard.html',
  });
});


var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
    return $window._;
}]);