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

    this.current = all[index];

    var getImage = function(obj) {
      return obj.c_main_dish_image.high_feature;
    };

    this.next = function() {
      if(index !== num-1) {
        return all[index++];
      }
      return false;
    };

    this.previous = function() {
      if(index !== 0) {
        return all[index--];
      }
      return false;
    };

    this.last = index === num-1;
  }
})();
