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
        self.current= all[++index];
        self.last = index === num-1;
        return self.current;
      }
      return false;
    };

    this.last = index === num-1;

    $('.swipe-container').on('swiperight', function(e) {
      var $target = $(e.currentTarget);
      $target.addClass('swipe-right').delay(700).fadeOut(1);
      // handleSwipe();
    });

    $('.swipe-container').on('swipeleft', function(e) {
      var $target = $(e.currentTarget);
      $target.addClass('swipe-left').delay(700).fadeOut(1);
      // handleSwipe();
    });

    var handleSwipe = function() {
      self.next();
      $scope.$apply(function() {
        $scope.current = self.current;
        $scope.last = self.last;
      });
    };
  }
})();
