(function() {
  angular
    .module("hungr")
    .controller("RecipeController", RecipeController);

  RecipeController.$inject = ['$scope', 'RecipeFactory', 'recipes'];
  function RecipeController($scope, RecipeFactory, recipes) {
    var self = this,
        index = 0,
        all = recipes.data,
        num = all.length;

    var getImage = function(obj) {
      return obj.c_main_dish_image.high_feature;
    };

    this.at = function() {
      return getImage(all[index]);
    };

    this.next = function() {
      if(index !== num-1) {
        return getImage(all[index++]);
      }
      return false;
    };

    this.previous = function() {
      if(index !== 0) {
        return getImage(all[index--]);
      }
      return false;
    };
  }
})();
