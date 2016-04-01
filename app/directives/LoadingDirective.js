(function() {
  angular
    .module("hungr")
    .directive("loading", loading);

  loading.$inject = ['$rootScope'];
  function loading($rootScope) {
    return {
      restrict: 'E',
      templateUrl: '/templates/loading.html',
      link: function(scope, elem, attrs) {
        scope.isRouteLoading = false;

        $rootScope.$on('$routeChangeStart', function() {
          scope.isRouteLoading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
          scope.isRouteLoading = false;
        });
      }
    };
  }

})();
