(function() {
  angular
    .module("hungr")
    .controller("RecipeController", RecipeController);

  function RecipeController($scope, RecipeFactory) {
    var self = this;
    this.recipes = RecipeFactory.getRecipes();
  }
})();
