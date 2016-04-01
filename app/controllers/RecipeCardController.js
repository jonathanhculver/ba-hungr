(function() {
  angular
    .module("hungr")
    .controller("RecipeController", RecipeController);

  RecipeController.$inject = ['$scope', 'RecipeFactory', 'recipes', '$location'];
  function RecipeController($scope, RecipeFactory, recipes, $location) {
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

    $('body').on('swiperight', '.swipe-container', function(e) {
      var $target = $(e.currentTarget),
          $star = $target.find('.swipe-star-svg');

      $star.show();
      $target.addClass('swipe-right')
             .delay(700)
             .fadeOut(1)
             .queue(handleSwipe);
    });

    $('body').on('swipeleft', '.swipe-container',  function(e) {
      var $target = $(e.currentTarget),
          $x = $target.find('.swipe-x-svg');

      $x.show();
      $target.addClass('swipe-left')
             .delay(700)
             .fadeOut(1)
             .queue(function(next) {
                handleSwipe(next);
             });
    });

    var handleSwipe = function(next) {
      var $swipeSvg = $('.swipe-svg'),
          $swipeContainer = $('.swipe-container');

      $swipeSvg.hide();
      var isNext = self.next();
      if(!isNext) {
        $location.path("/palette");
      }
      $scope.$apply(function() {
        $scope.current = self.current;
        $scope.last = self.last;
      });
      $swipeContainer.removeClass('swipe-left');
      $swipeContainer.removeClass('swipe-right');
      $swipeContainer.show();
      next();
    };
  }
})();
