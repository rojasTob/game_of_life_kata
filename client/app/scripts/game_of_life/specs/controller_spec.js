'use strict';

describe('Controller: game_of_life', function () {

  beforeEach(module('Game_of_life'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('game_of_life', { $scope: scope });
  }));

  describe('On instance', function(){
    it('should set "controller_loaded" variable in scope', function() {
      expect(scope.controller_loaded).toContain('loaded');
    });

    it('should set init state of the matrix',function(){
      var matrixInit = [
        ['.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.']];
      scope.initMatrix(4,8);
      expect(scope.matrix).toEqual(matrixInit);
    });

      it('should insert an alive cell in the matrix',function(){
        scope.initMatrix(4,8);
        var matrixWithAliveCells = [
            ['.','.','.','.','.','.','.','.'],
            ['.','.','.','.','*','.','.','.'],
            ['.','.','.','*','*','.','.','.'],
            ['.','.','.','.','.','.','.','.']];

        scope.aliveCell(1,4);
        scope.aliveCell(2,4);
        scope.aliveCell(2,3);
        expect(scope.matrix).toEqual(matrixWithAliveCells);

      });

      it('should analyze the first case of neighbours', function(){
          var matrixResult = [
              ['.','.','.','.','.','.','.','.'],
              ['.','.','.','.','.','.','.','.'],
              ['.','.','.','.','.','.','.','.'],
              ['.','.','.','.','.','.','.','.']];

          scope.initMatrix(4,8);
          scope.aliveCell(1,4);
          scope.aliveCell(2,4);
          scope.analyzeMatrix();
          expect(scope.matrix).toEqual(matrixResult);
      });

      it('should analyze the second case of neighbours', function(){
          var matrixResult = [
              ['.','.','.','.','.','.','.','.'],
              ['.','.','.','.','.','.','.','.'],
              ['.','.','.','*','*','.','.','.'],
              ['.','.','.','.','.','.','.','.']];

          scope.initMatrix(4,8);
          scope.aliveCell(2,2);
          scope.aliveCell(2,3);
          scope.aliveCell(2,4);
          scope.aliveCell(1,6);
          scope.analyzeMatrix();
          expect(scope.matrix).toEqual(matrixResult);
      });

      it('should analyze the third case of neighbours', function(){
          var matrixResult = [
              ['.','.','.','.','.','.','.','.'],
              ['.','.','.','.','.','.','.','.'],
              ['.','.','.','*','*','.','.','.'],
              ['.','.','.','.','.','.','.','.']];

          scope.initMatrix(4,8);
          scope.aliveCell(2,2);
          scope.aliveCell(2,3);
          scope.aliveCell(2,4);
          scope.aliveCell(1,6);
          scope.analyzeMatrix();
          expect(scope.matrix).toEqual(matrixResult);
      });

  });

  describe('when going to /game_of_life', function() {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function($route, $location, $rootScope, $httpBackend){
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/game_of_life/views/game_of_life.html').respond('<div></div>');
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use game_of_life.html and controller', function() {
      expect(route.current).toBeUndefined();

      location.path('/game_of_life');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/game_of_life/views/game_of_life.html');
      expect(route.current.controller).toBe('game_of_life');
    });
  });

});
