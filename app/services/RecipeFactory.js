(function() {
  angular
    .module("hungr")
    .factory("RecipeFactory", RecipeFactory);

  function RecipeFactory($http, $q) {
    var self = {};

    self.getRecipes = function() {
      var promise = $http.get('/api/recipes').success(function(data) {
        return data;
      });
      return promise;
    };


    return self;
  }
})();
