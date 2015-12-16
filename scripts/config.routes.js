'use strict';
angular.module('returnBoostApp')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        templateUrl: 'views/home.html'
      })
      .state('strategies-find', {
        url: '/find-strategies',
        data: {
          step: {
            index: 0,
            name: 'Find Strategies'
          }
        },
        controller: 'FindStrategiesCtrl',
        controllerAs: 'findStrategies',
        templateUrl: 'views/find-strategies.html',
        resolve: {
          strategiesResolve: ['Strategy', 'helper', 'COLORS', function (Strategy, helper, COLORS) {
            return Strategy.query().$promise;
          }],
          assetClassesResolve: ['AssetClass', function (AssetClass) {
            return AssetClass.query().$promise;
          }]
        }
      })
      .state('strategies-compare', {
        url: '/compare-strategies',
        data: {
          step: {
            index: 1,
            name: 'Compare Strategies'
          }
        },
        controller: 'CompareStrategiesCtrl',
        controllerAs: 'compareStrategies',
        templateUrl: 'views/compare-strategies.html',
        resolve: {
          assetClassesResolve: ['AssetClass', function (AssetClass) {
            return AssetClass.query().$promise;
          }]
        }
      })
      .state('strategies-customize', {
        url: '/customize-strategies',
        data: {
          step: {
            index: 2,
            name: 'Customize Strategies'
          }
        },
        controller: 'CustomizeStrategiesCtrl',
        controllerAs: 'customizeStrategies',
        templateUrl: 'views/customize-strategies.html'
      })
      .state('strategies-follow', {
        url: '/follow-strategy',
        data: {
          step: {
            index: 3,
            name: 'Follow Strategy'
          }
        },
        controller: 'FollowStrategiesCtrl',
        controllerAs: 'followStrategies',
        templateUrl: 'views/follow-strategies.html',
        resolve: {
          portfoliosResolve: ['Portfolio', function (Portfolio) {
            return Portfolio.query().$promise;
          }]
        }
      })
  }]);
