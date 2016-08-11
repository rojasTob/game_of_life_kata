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
