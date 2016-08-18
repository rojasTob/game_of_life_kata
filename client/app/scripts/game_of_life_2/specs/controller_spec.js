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
            var matrixInit = [
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.']];
            scope.initMatrix(4, 8);
            expect(scope.matrix).toEqual(matrixInit);
        });



    });

});
