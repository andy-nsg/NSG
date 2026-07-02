four51.app.controller('CategoryCtrl', ['$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav',
  function ($routeParams, $sce, $scope, $451, Category, Product, Nav) {
    $scope.productLoadingIndicator = true;
    $scope.settings = {
      currentPage: 1,
      pageSize: 40
    };
    $scope.trusted = function(d){
      if(d) return $sce.trustAsHtml(d);
    }
  
    function _search() {
      $scope.searchLoading = true;
      Product.search($routeParams.categoryInteropID, null, null, function (products, count) {
        $scope.products = products;
        $scope.productCount = count;
        $scope.productLoadingIndicator = false;
        $scope.searchLoading = false;
      }, $scope.settings.currentPage, $scope.settings.pageSize);
    }
  
    $scope.$watch('settings.currentPage', function(n, o) {
      if (n != o || (n == 1 && o == 1))
        _search();
      // Pagination re-fetches products in place (no route change), so ng-view's autoscroll
      // never fires and the browser stays at whatever scroll position the user clicked from -
      // often mid-page or at the bottom. Scroll the product list header (Products / Sort by row)
      // back into view, offset by the fixed navbar's actual rendered height so it isn't hidden
      // underneath it. Skip on the watch's initial firing (n == o) so page load doesn't jump.
      if (n != o) {
        var $header = $('.product-list-header');
        if ($header.length) {
          var navHeight = $('.navbar-fixed-top').outerHeight() || 0;
          $('html, body').animate({ scrollTop: $header.offset().top - navHeight - 10 }, 400);
        }
      }
    });
  
    if ($routeParams.categoryInteropID) {
        $scope.categoryLoadingIndicator = true;
          Category.get($routeParams.categoryInteropID, function(cat) {
              $scope.currentCategory = cat;
            $scope.categoryLoadingIndicator = false;
          });
      }
    else if($scope.tree){
      $scope.currentCategory ={SubCategories:$scope.tree};
    }
  
  
    $scope.$on("treeComplete", function(data){
      if (!$routeParams.categoryInteropID) {
        $scope.currentCategory ={SubCategories:$scope.tree};
      }
    });
  
      // panel-nav
      $scope.navStatus = Nav.status;
      $scope.toggleNav = Nav.toggle;
    $scope.$watch('sort', function(s) {
      if (!s) return;
      (s.indexOf('Price') > -1) ?
        $scope.sorter = 'StandardPriceSchedule.PriceBreaks[0].Price' :
        $scope.sorter = s.replace(' DESC', "");
      $scope.direction = s.indexOf('DESC') > -1;
    });
  }]);