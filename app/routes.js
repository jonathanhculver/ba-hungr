(function() {
  //route config
  angular
    .module("hungr")
    .config(config);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        controller: "RecipeController",
        templateUrl: "/templates/recipecard.html"
      });
    $locationProvider.html5Mode(true);
  }
})();
