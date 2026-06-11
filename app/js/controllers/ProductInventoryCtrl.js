four51.app.controller('ProductInventoryCtrl', ['$scope', function($scope) {
    
    // Check if ALL variants are in stock (handles both standard and matrix)
    $scope.allVariantsInStock = function() {
        if (!$scope.LineItem || !$scope.LineItem.Product) return false;
        
        var product = $scope.LineItem.Product;
        
        // Check standard variants first
        if (product.Variants && product.Variants.length > 0) {
            return product.Variants.every(function(v) {
                var qty = parseInt(v.QuantityAvailable || 0);
                return qty > 0;
            });
        }
        
        // Check matrix variants (comboVariants)
        if ($scope.comboVariants && $scope.comboVariants.length > 0) {
            return $scope.comboVariants.every(function(group) {
                // For 2-spec matrix, group is an array of variants
                if (Array.isArray(group)) {
                    return group.every(function(v) {
                        return parseInt(v.QuantityAvailable || 0) > 0;
                    });
                }
                // For 1-spec matrix
                return parseInt(group.QuantityAvailable || 0) > 0;
            });
        }
        
        // No variants - check product level
        return parseInt(product.QuantityAvailable || 0) > 0;
    };

    // Check if SOME variants are in stock (at least one)
    $scope.someVariantsInStock = function() {
        if (!$scope.LineItem || !$scope.LineItem.Product) return false;
        
        var product = $scope.LineItem.Product;
        
        // Check standard variants
        if (product.Variants && product.Variants.length > 0) {
            return product.Variants.some(function(v) {
                var qty = parseInt(v.QuantityAvailable || 0);
                return qty > 0;
            });
        }
        
        // Check matrix variants
        if ($scope.comboVariants && $scope.comboVariants.length > 0) {
            return $scope.comboVariants.some(function(group) {
                if (Array.isArray(group)) {
                    return group.some(function(v) {
                        return parseInt(v.QuantityAvailable || 0) > 0;
                    });
                }
                return parseInt(group.QuantityAvailable || 0) > 0;
            });
        }
        
        // No variants - check product level
        return parseInt(product.QuantityAvailable || 0) > 0;
    };
    
    // Watch for matrix data and set scope variable
    $scope.$watch('comboVariants', function(variants) {
        if (variants && variants.length > 0) {
            console.log('Matrix loaded:', variants.length, 'groups');
            
            // Check if all matrix items are in stock
            var allInStock = variants.every(function(group) {
                if (Array.isArray(group)) {
                    return group.every(function(v) { 
                        return parseInt(v.QuantityAvailable || 0) > 0; 
                    });
                }
                return parseInt(group.QuantityAvailable || 0) > 0;
            });
            
            // Check if some are in stock
            var someInStock = variants.some(function(group) {
                if (Array.isArray(group)) {
                    return group.some(function(v) { 
                        return parseInt(v.QuantityAvailable || 0) > 0; 
                    });
                }
                return parseInt(group.QuantityAvailable || 0) > 0;
            });
            
            console.log('Matrix all in stock:', allInStock);
            console.log('Matrix some in stock:', someInStock);
            
            // Store for use in HTML
            $scope.matrixAllInStock = allInStock;
            $scope.matrixSomeInStock = someInStock;
            $scope.matrixLoaded = true;
        }
    });
    
}]);