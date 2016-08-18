'use strict';

describe('Controller: game_of_life_2', function(){

    beforeEach(module('Game_of_life_2'));
    beforeEach(module('underscore'));

    var controller;
    var scope;

    beforeEach(inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        controller = $controller('game_of_life_2',{$scope:scope});
    }));

    describe('On instance',function(){
        it('should set "controller_loaded" variable in scope',function(){
            expect(scope.controller_loaded).toContain('loaded');
        });

        it('should set init state of the matrix', function () {
            var matrix_init = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];
            scope.init_matrix(4, 8);
            expect(scope.matrix).toEqual(matrix_init);
        });

        it('should insert an alive cell in the matrix', function () {
            var matrix_with_alive_cells = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '*', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.init_matrix(4, 8);
            scope.marked_positions = [{row: 1, col: 4},{row: 2, col: 4},{row: 2, col: 3}];
            scope.mark_positions();
            expect(scope.matrix).toEqual(matrix_with_alive_cells);
        });

        it('should clone the main matrix', function () {
            var matrix_cloned = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '*', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.init_matrix(4, 8);
            scope.marked_positions = [{row: 1, col: 4},{row: 2, col: 4},{row: 2, col: 3}];
            scope.mark_positions();
            scope.clone_matrix();
            expect(scope.matrix_clone).toEqual(matrix_cloned);
        });

        it('a live cell with two live neighbours stay alive', function () {
            var matrix_result = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '*', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.init_matrix(4, 8);
            scope.marked_positions = [{row: 1, col: 4},{row: 2, col: 4},{row: 2, col: 3}];
            scope.mark_positions();
            scope.clone_matrix();
            scope.analyzeAliveCells();
            expect(scope.matrix_clone).toEqual(matrix_result);
        });

        it('a live cell with fewer than two live neighbours should die', function () {
            var matrix_result = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '*', '*', '.', '.'],
                ['.', '.', '.', '.', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.init_matrix(4, 8);
            scope.marked_positions = [{row: 1, col: 1},{row: 1, col: 2},{row: 1, col: 4},{row: 1, col: 5},{row: 2, col: 4}];
            scope.mark_positions();
            scope.clone_matrix();
            scope.analyzeAliveCells();
            expect(scope.matrix_clone).toEqual(matrix_result);
        });

        it('two consecutive live cells should die', function () {
            var matrix_result = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.init_matrix(4, 8);
            scope.marked_positions = [{row: 1, col: 1},{row: 1, col: 2}];
            scope.mark_positions();
            scope.clone_matrix();
            scope.analyzeAliveCells();
            expect(scope.matrix_clone).toEqual(matrix_result);
        });

        it('a live cell with more than three live neighbours should die', function () {
            var matrix_result = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '*', '.', '*', '.', '.'],
                ['.', '.', '.', '*', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.init_matrix(4, 8);
            scope.marked_positions = [{row: 1, col: 3},{row: 1, col: 4},{row: 1, col: 5},{row: 2, col: 3},{row: 2, col: 4}];
            scope.mark_positions();
            scope.clone_matrix();
            scope.analyzeAliveCells();
            expect(scope.matrix_clone).toEqual(matrix_result);
        });

        it('should analyze the matrix with all rules',function(){
            var matrixResult = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.init_matrix(4, 8);
            scope.marked_positions = [{row: 1, col: 4},{row: 2, col: 3},{row: 2, col: 4}];
            scope.mark_positions();
            scope.next_generation();
            expect(scope.matrix_clone).toEqual(matrixResult);
        });

    });


    describe('when going to /game_of_life_2', function () {

        var route, location, rootScope, httpBackend;

        beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
            route = $route;
            location = $location;
            rootScope = $rootScope;
            httpBackend = $httpBackend;

            httpBackend.when('GET', 'scripts/game_of_life_2/views/game_of_life_2.html').respond('<div></div>');
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should use game_of_life_2.html and controller', function () {
            expect(route.current).toBeUndefined();

            location.path('/game_of_life_2');

            httpBackend.flush();

            expect(route.current.templateUrl).toBe('scripts/game_of_life_2/views/game_of_life_2.html');
            expect(route.current.controller).toBe('game_of_life_2');
        });
    });

});
