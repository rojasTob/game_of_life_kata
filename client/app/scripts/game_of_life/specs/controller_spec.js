'use strict';

describe('Controller: game_of_life', function () {

    beforeEach(module('Game_of_life'));
    beforeEach(module('underscore'));

    var controller;
    var scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('game_of_life', {$scope: scope});
    }));

    describe('On instance', function () {
        it('should set "controller_loaded" variable in scope', function () {
            expect(scope.controller_loaded).toContain('loaded');
        });

        it('should set init state of the matrix', function () {
            var matrixInit = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];
            scope.initMatrix(4, 8);
            expect(scope.matrix).toEqual(matrixInit);
        });

        it('should insert an alive cell in the matrix', function () {
            scope.initMatrix(4, 8);
            var matrixWithAliveCells = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '*', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.aliveCell(1, 4);
            scope.aliveCell(2, 4);
            scope.aliveCell(2, 3);
            expect(scope.matrix).toEqual(matrixWithAliveCells);

        });

        it('should clone the main matrix', function () {
            var matrixCloned = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '*', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.initMatrix(4, 8);
            scope.aliveCell(1, 4);
            scope.aliveCell(2, 3);
            scope.aliveCell(2, 4);
            scope.cloneMatrix();
            expect(scope.matrixClone).toEqual(matrixCloned);
        });

        it('a live cell with two live neighbours stay alive', function () {
            var matrixResult = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '*', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.initMatrix(4, 8);
            scope.aliveCell(1, 4);
            scope.aliveCell(2, 3);
            scope.aliveCell(2, 4);
            scope.cloneMatrix();
            scope.analyzeAliveCells();
            expect(scope.matrixClone).toEqual(matrixResult);
        });

        it('a live cell with fewer than two live neighbours should die', function () {
            var matrixResult = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '*', '*', '.', '.'],
                ['.', '.', '.', '.', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.initMatrix(4, 8);
            scope.aliveCell(1, 1);
            scope.aliveCell(1, 2);
            scope.aliveCell(1, 4);
            scope.aliveCell(1, 5);
            scope.aliveCell(2, 4);
            scope.cloneMatrix();
            scope.analyzeAliveCells();
            expect(scope.matrixClone).toEqual(matrixResult);
        });

        it('two consecutive live cells should die', function () {
            var matrixResult = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.initMatrix(4, 8);
            scope.aliveCell(1, 1);
            scope.aliveCell(1, 2);
            scope.cloneMatrix();
            scope.analyzeAliveCells();
            expect(scope.matrixClone).toEqual(matrixResult);
        });

        it('a live cell with more than three live neighbours should die', function () {
            var matrixResult = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '*', '.', '*', '.', '.'],
                ['.', '.', '.', '*', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.initMatrix(4, 8);
            scope.aliveCell(1, 3);
            scope.aliveCell(1, 4);
            scope.aliveCell(1, 5);
            scope.aliveCell(2, 3);
            scope.aliveCell(2, 4);
            scope.cloneMatrix();
            scope.analyzeAliveCells();
            expect(scope.matrixClone).toEqual(matrixResult);
        });

        it('should analyze the matrix with all rules',function(){
            var matrixResult = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.initMatrix(4, 8);
            scope.aliveCell(1, 4);
            scope.aliveCell(2, 3);
            scope.aliveCell(2, 4);
            scope.next_generation();
            expect(scope.matrixClone).toEqual(matrixResult);
        });

    });

    describe('when going to /game_of_life', function () {

        var route, location, rootScope, httpBackend;

        beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
            route = $route;
            location = $location;
            rootScope = $rootScope;
            httpBackend = $httpBackend;

            httpBackend.when('GET', 'scripts/game_of_life/views/game_of_life.html').respond('<div></div>');
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should use game_of_life.html and controller', function () {
            expect(route.current).toBeUndefined();

            location.path('/game_of_life');

            httpBackend.flush();

            expect(route.current.templateUrl).toBe('scripts/game_of_life/views/game_of_life.html');
            expect(route.current.controller).toBe('game_of_life');
        });
    });

});
