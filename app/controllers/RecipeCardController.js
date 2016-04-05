(function() {
  angular
    .module("hungr")
    .controller("RecipeController", RecipeController);

  RecipeController.$inject = ['$scope', 'RecipeFactory', 'recipes', '$location', '$timeout'];
  function RecipeController($scope, RecipeFactory, recipes, $location, $timeout) {
    var self = this,
        index = 0,
        all = recipes.data,
        num = all.length;

    this.current = all[index];
    this.swipeClass = '';
    this.swipedRight = false;
    this.swipedLeft = false;

    var nextRecipe = function() {
      if(index !== num-1) {
        self.current= all[++index];
        self.last = index === num-1;
      }
    };

    this.last = index === num-1;

    this.swipe = function(direction) {
      self.swipeClass = 'swipe-'+direction;
      direction === 'left' ? self.swipedLeft = true : self.swipedRight = true;
      $timeout(reset, 700);
    };

    var reset = function() {
      self.swipedLeft = false;
      self.swipedRight = false;
      nextRecipe();
      if(!self.last) {
        $location.path("/palette");
      }
      self.swipeClass = '';
    };
  }
})();
