(function() {
  //route config
  angular
    .module("hungr")
    .config(config)
    .service();

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        controller: "RecipeController",
        controllerAs: "recipe",
        templateUrl: "/templates/recipecard.html",
        resolve: {
          recipes: getRecipesService
        }
      })
      .when("/palette", {
        controller: "PaletteController",
        controllerAs: "palette",
        templateUrl: "/templates/palette.html"
      })
      .when("/loading", {
        templateUrl: "/templates/loading_2.html"
      })
      .otherwise({
        redirectTo: '/loading'
      });
    $locationProvider.html5Mode(true);
  }

  function getRecipesService(RecipeFactory) {
    return RecipeFactory.getRecipes();
  }
})();
