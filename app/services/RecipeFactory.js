(function() {
  angular
    .module("hungr")
    .factory("RecipeFactory", RecipeFactory);

  function RecipeFactory($http, $q) {
    var self = {};

    self.getRecipes = function() {
      var promise = $q.defer();
      $http.get('/api/recipes').success(function(data) {
        promise.resolve(data);
      });
      return promise;
    };

    return self;
  }
})();
