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

    });

});
