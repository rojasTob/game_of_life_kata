'use strict';

describe('Controller: fizz_buzz', function () {

    beforeEach(module('Fizz_Buzz'));

    var controller;
    var scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('fizz_buzz', {$scope: scope});
    }));

    describe('On instance', function () {
        it('should set "controller_loaded" variable in scope', function () {
            expect(scope.controller_loaded).toContain('loaded');
        });

        it('should have a top number initialized', function(){
            expect(scope.top_number).toBe(1);
        });

        it('should have a result array initialized', function(){
            expect(scope.results_game).toEqual([]);
        });

        it('should generate numbers from 1 to 10', function(){
            scope.top_number = 10;
            scope.generate_numbers();
            expect(scope.results_game.length).toBe(10);
        });

        it('if a number is divisible by 3 should return true', function(){
            expect(scope.divisible_by_three(3)).toBe(true);
        });

        it('if a number is not divisible by 3 should return false', function(){
            expect(scope.divisible_by_three(4)).toBe(false);
        });

        it('if a number is divisible by 5 should return true', function(){
            expect(scope.divisible_by_five(5)).toBe(true);
        });

        it('if a number is not divisible by 5 should return false', function(){
            expect(scope.divisible_by_five(4)).toBe(false);
        });

        it('when a number is divisible by 3, the result should have the word Fizz instead of the number', function(){
            expect(scope.analyze_result(6)).toEqual('Fizz');
        });

        it('when a number is divisible by 5, the result should have the word Buzz instead of the number', function(){
            expect(scope.analyze_result(10)).toEqual('Buzz');
        });

        it('when a number is divisible by 3 and 5, the result should have the word FizzBuzz instead of the number', function(){
            expect(scope.analyze_result(15)).toEqual('FizzBuzz');
        });

        it('when a number is not divisible by 3 or 5, the result should have the same number', function(){
            expect(scope.analyze_result(4)).toEqual('4');
        });

        it('should generate numbers from 1 to 16 and should return the result', function(){
            scope.top_number = 16;
            scope.generate_numbers();
            expect(scope.results_game[2]).toEqual('Fizz');
            expect(scope.results_game[3]).toEqual('4');
            expect(scope.results_game[4]).toEqual('Buzz');
            expect(scope.results_game[14]).toEqual('FizzBuzz');
        });

    });

    describe('when going to /fizz_buzz', function () {

        var route, location, rootScope, httpBackend;

        beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
            route = $route;
            location = $location;
            rootScope = $rootScope;
            httpBackend = $httpBackend;

            httpBackend.when('GET', 'scripts/fizz_buzz/views/fizz_buzz.html').respond('<div></div>');
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should use fizz_buzz.html and controller', function () {
            expect(route.current).toBeUndefined();

            location.path('/fizz_buzz');

            httpBackend.flush();

            expect(route.current.templateUrl).toBe('scripts/fizz_buzz/views/fizz_buzz.html');
            expect(route.current.controller).toBe('fizz_buzz');
        });
    });

});
