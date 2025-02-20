four51.app.controller('LineItemEditCtrl', ['$scope', '$routeParams', '$location', 'Product', 'ProductDisplayService', 'Order',
  function ($scope, $routeParams, $location, Product, ProductDisplayService, Order) {
      $scope.isEditforApproval = $routeParams.orderID && $scope.user.Permissions.contains('EditApprovalOrder');
      $scope.EditingLineItem = (typeof($routeParams.lineItemIndex) != 'undefined');
      if ($scope.EditingLineItem) $scope.LineItemIndex = $routeParams.lineItemIndex;
      if ($scope.isEditforApproval) {
          Order.get($routeParams.orderID, function(order) {
              $scope.currentOrder = order;
              init();
          });
      }
      else {init()}

      function init() {
          $scope.LineItem = {};
          $scope.LineItem = $scope.currentOrder.LineItems[$routeParams.lineItemIndex];
          if($scope.LineItem.Variant && $scope.LineItem.Variant.InteropID){
              ProductDisplayService.getProductAndVariant($scope.LineItem.Product.InteropID, $scope.LineItem.Variant.InteropID, function (data) {
                  $scope.LineItem.Product = data.product;
                  $scope.LineItem.Variant = data.variant;
                  ProductDisplayService.setNewLineItemScope($scope);
                  ProductDisplayService.setProductViewScope($scope);
              }, 1, 10, null);
          }
          else{
              Product.get($scope.LineItem.Product.InteropID, function(product){
                  $scope.LineItem.Product = product;
                  ProductDisplayService.setProductViewScope($scope);
              });
          }
      }

      $scope.allowAddToOrder = true;
      $scope.addToOrderText = "Save Line Item";
      $scope.addToOrder = function(){
          if($scope.lineItemErrors && $scope.lineItemErrors.length){
              $scope.showAddToCartErrors = true;
              return;
          }
          Order.save($scope.currentOrder, function(o){
              $scope.currentOrder = o;
              $location.path('/cart' + ($scope.isEditforApproval ? ('/' + o.ID) : ''));
          }, function(ex){
              console.log(ex);
          });
      }
  }]);
