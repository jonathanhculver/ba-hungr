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
    this.swipeClass = '';
    this.swipedRight = false;
    this.swipedLeft = false;

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
      var $target = $(e.currentTarget);

      self.swipedRight = true;
      $scope.$apply(function() {
        $scope.swipedRight = self.swipedRight;
      });
      $target.addClass('swipe-right')
             .delay(700)
             .fadeOut(1)
             .queue(handleSwipe);
    });

    $('body').on('swipeleft', '.swipe-container',  function(e) {
      var $target = $(e.currentTarget);

      self.swipedLeft = true;
      $scope.$apply(function() {
        $scope.swipedLeft = self.swipedLeft;
      });
      $target.addClass('swipe-left')
             .delay(700)
             .fadeOut(1)
             .queue(function(next) {
                handleSwipe(next);
             });
    });

    this.swipeRight = function() {
      self.swipeClass = 'swipe-right';
      self.swipedRight = true;
      setTimeout(function() {
        reset();
      }, 700);
    };

    this.swipeLeft = function() {
      self.swipeClass = 'swipe-left';
      self.swipedLeft = true;
      setTimeout(function() {
        reset();
      }, 700);
    };

    var reset = function() {
      self.swipeClass = '';
      self.swipedLeft = false;
      self.swipedRight = false;
      var isNext = self.next();
      $scope.$apply(function() {
        $scope.current = self.current;
        $scope.last = self.last;
      });
    };

    var handleSwipe = function(next) {
      var $swipeContainer = $('.swipe-container');

      var isNext = self.next();
      if(!isNext) {
        $location.path("/palette");
      }
      self.swipedRight = false;
      self.swipedLeft = false;
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
