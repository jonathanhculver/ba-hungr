(function() {
  angular
    .module("hungr")
    .factory("RecipeFactory", RecipeFactory);

  function RecipeFactory($http, $q) {
    var self = {};

    self.getRecipes = function() {
      var deferred = $q.defer();
      $http.get('/api/recipes').success(function(data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    };

    return self;
  }
})();
