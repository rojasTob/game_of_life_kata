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

        it('should count the number of neighbours',function(){
            scope.init_matrix(4, 4);
            scope.marked_positions = [{row: 1, col: 2},{row: 1, col: 3},{row: 2, col: 1},{row: 2, col: 2}];
            scope.mark_positions();
            scope.clone_matrix();
            var neighbours = scope.find_neighbours_number(2,1);
            expect(neighbours).toBe(2);
        });

        it('should analyze the matrix',function(){
            var matrix_result = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '*', '*', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];

            scope.init_matrix(4, 8);
            scope.marked_positions = [{row: 1, col: 4},{row: 2, col: 3},{row: 2, col: 4}];
            scope.mark_positions();
            scope.clone_matrix();
            scope.analyze_cells();
            expect(scope.matrix_clone).toEqual(matrix_result);
        });

        it('should calculate the next generation of the matrix', function(){
            var matrix_result = [
                                  ['.', '.', '.', '.', '.'],
                                  ['.', '.', '.', '.', '.'],
                                  ['.', '*', '*', '*', '.'],
                                  ['.', '.', '.', '.', '.'],
                                  ['.', '.', '.', '.', '.']];

            scope.init_matrix(5, 5);
            scope.marked_positions = [{row: 1, col: 2},{row: 2, col: 2},{row: 3, col: 2}];
            scope.mark_positions();
            scope.next_generation();
            expect(scope.matrix_clone).toEqual(matrix_result);
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
