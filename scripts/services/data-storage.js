'use strict';

/**
 * @description
 * # dataStorageService
 * Stores user data
 */

 angular.module('returnBoostApp')
  .factory('dataStorage', [function(){
    var storage = {
      selectedAssetClasses: [],
      selectedStrategies: [],
      investment: null,
      selectedStrategy: null,
    };

    return storage;
  }])
