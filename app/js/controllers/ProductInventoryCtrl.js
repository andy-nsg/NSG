four51.app.controller('ProductInventoryCtrl', ['$scope', function($scope) {
    
    // Check if ALL variants are in stock
    $scope.allVariantsInStock = function() {
        if (!$scope.LineItem || !$scope.LineItem.Product) return false;
        
        var product = $scope.LineItem.Product;
        
        // No variants loaded yet - return false (don't show "all in stock")
        if (!product.Variants || product.Variants.length === 0) {
            // Check product level inventory instead
            return parseInt(product.QuantityAvailable || 0) > 0;
        }
        
        // Has variants - check all are in stock
        return product.Variants.every(function(v) {
            var qty = parseInt(v.QuantityAvailable || 0);
            return qty > 0;
        });
    };

    // Check if SOME variants are in stock (at least one)
    $scope.someVariantsInStock = function() {
        if (!$scope.LineItem || !$scope.LineItem.Product) return false;
        
        var product = $scope.LineItem.Product;
        
        // No variants loaded yet
        if (!product.Variants || product.Variants.length === 0) {
            return parseInt(product.QuantityAvailable || 0) > 0;
        }
        
        // Has variants - check if at least one is in stock
        return product.Variants.some(function(v) {
            var qty = parseInt(v.QuantityAvailable || 0);
            return qty > 0;
        });
    };
    
// Debug - check matrix data structure
$scope.$watch('comboVariants', function(variants) {
    if (variants) {
        console.log('Matrix variants:', variants);
        console.log('Is array?', Array.isArray(variants));
        if (Array.isArray(variants) && variants.length > 0) {
            console.log('First variant:', variants[0]);
            console.log('Has QuantityAvailable?', 'QuantityAvailable' in variants[0]);
        }
    }
});

// Also watch standard variants
$scope.$watch('LineItem.Product.Variants', function(variants) {
    if (variants && variants.length > 0) {
        console.log('Standard variants:', variants);
    } else {
        console.log('No standard variants found');
    }
});
    
}]);