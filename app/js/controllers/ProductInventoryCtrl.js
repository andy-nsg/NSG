four51.app.controller('ProductInventoryCtrl', ['$scope', function($scope) {
    
    // Check if ALL variants are in stock
    $scope.allVariantsInStock = function() {
        if (!$scope.LineItem || !$scope.LineItem.Product) return false;
        
        var product = $scope.LineItem.Product;
        
        // No variants - check product level inventory
        if (!product.Variants || product.Variants.length === 0) {
            return product.QuantityAvailable > 0;
        }
        
        // Has variants - check all are in stock
        return product.Variants.every(function(v) {
            return v.QuantityAvailable > 0;
        });
    };

    // Check if SOME variants are in stock (at least one)
    $scope.someVariantsInStock = function() {
        if (!$scope.LineItem || !$scope.LineItem.Product) return false;
        
        var product = $scope.LineItem.Product;
        
        // No variants - check product level inventory
        if (!product.Variants || product.Variants.length === 0) {
            return product.QuantityAvailable > 0;
        }
        
        // Has variants - check if at least one is in stock
        return product.Variants.some(function(v) {
            return v.QuantityAvailable > 0;
        });
    };
    
}]);