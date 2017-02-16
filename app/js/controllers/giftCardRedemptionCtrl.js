four51.app.controller('GiftCardRedemptionCtrl', ['$scope', '$route', 'GiftCard', function($scope, $route, GiftCard) {
	$scope.redeemGiftCard = function() {
		$scope.$parent.gcMessage = null;
		GiftCard.redeem(this.giftcard,
			function(card) {
				$scope.giftcard = card;
				setTimeout(location.reload.bind(location), 3000); //Add this to delay refresh for gift card
				//$route.reload();//Add this to refresh for gift card
			},
			function(ex) {
				$scope.$parent.gcMessage = ex.Message;
			}
		);
	}
}]);
