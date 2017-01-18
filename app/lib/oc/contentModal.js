angular.module('OrderCloud-ContentModal', []);

angular.module('OrderCloud-ContentModal')
    .directive('contentmodal', contentmodal)
    .controller('ContentModalCtrl', ContentModalCtrl)
;

function contentmodal() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'ContentModalCtrl'
    };
    return directive;

    function template() {
        return [
            '<style>',
            //this style is conditional based on nav placement and site css
            'contentmodal a, contentmodal a:hover, contentmodal a:focus {color:#000000; font-size:15px; text-decoration:underline;}',
            '</style>',
            // update the size of the modal window within the open()
            '<a ng-click="open(500)">',
            // replace the *Open Modal* below with your link name
            '<span class="fa fa-info-circle"></span> {{\'READ PRODUCTION SCHEDULE DETAILS\' | r | xlat}}',
            '</a>'
        ].join('');
    }
}

ContentModalCtrl.$inject = ['$scope', '$modal'];
function ContentModalCtrl($scope, $modal) {

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size,
            template: contentmodalopen,
            controller: ContentModalOpenCtrl,
            resolve: {
                item: function () {
                    //pass a scope variable into the modal content. in this case we are providing line item as an example for product use
                    return $scope.LineItem;
                }
            }
        });

        function contentmodalopen() {
            return [
                '<style>',
                '.modal-header {background-color:#f5f5f5;border-bottom: 1px solid #ccc; min-height: 36px; padding: 2px;}',
                '.modal-header h3 { margin-top:0;}',
                '.modal-header h5 { font-size:1.16em; font-weight:bold; padding:5px 10px; text-shadow: 0 1px 0 #ffffff;}',
                '.modal-header a.close {margin:0;padding:0;position:absolute;top:8px;right:10px;font-size:1.5em;color:#000;}',
                '.modal-body {width:100%; margin:0 auto; padding:10px 25px;}',
                '</style>',
                '<div class="modal-header" class="col-xs-12 row pull-right">',
                //Optional title in top header
                '<h5 class="modal-title text-primary">Purchase Power Production Schedule</h5>',
                //Optional close (x) in top header
                '<a class="pull-right close" ng-click="close()">',
                '<i class="fa fa-times"></i>',
                '</a>',
                '</div>',
                //'<div class="modal-body">',
                //'<h3>Heading</h3>',
                //content block 1
                //'<h4>Subheading</h4>',
                //'<p>',
                //style="width: 485px;",
                '<br />',
                '<table class="modal-body tablePPTimeline purchasePowerModalBox" >',
                '<tbody>',
                //'<div class="thPPTimeline">',
                '<tr>',
                  '<th class="thPPTimeline">Orders received within this time frame&nbsp;by Noon CT on&nbsp;final date:</th>',
                  '<th class="thPPTimeline">Will ship&nbsp;no later than&nbsp;this date:</th>',
                '</tr>',
                //'</div>',
                '<tr>',
                  '<td class="tdPPTimeline">November 14th - December 18th</td>',
                  '<td class="tdPPTimeline">January 31st</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">December 19th - Januaray 16th</td>',
                  '<td class="tdPPTimeline">February 28th</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">January 17th - February 13th</td>',
                  '<td class="tdPPTimeline">March 31st</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">February 14th - March 13th</td>',
                  '<td class="tdPPTimeline">April 29th</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">March 14th - April 10th</td>',
                  '<td class="tdPPTimeline">May 31st</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">April 11th - May 15th</td>',
                  '<td class="tdPPTimeline">June 30th</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">May 16th - June 12th</td>',
                  '<td class="tdPPTimeline">July 31st</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">June 13th - July 10th</td>',
                  '<td class="tdPPTimeline">August 31st</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">July 11th - August 14th</td>',
                  '<td class="tdPPTimeline">September 29th</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">August 15th - September 11th</td>',
                  '<td class="tdPPTimeline">October 31st</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">September 12th - October 16th</td>',
                  '<td class="tdPPTimeline">November 30th</td>',
                '</tr>',
                '<tr>',
                  '<td class="tdPPTimeline">October 17th - November 10th</td>',
                  '<td class="tdPPTimeline">December 1th - In time for the Holidays</td>',
                '</tr>',
                '</tbody>',
                '</table>',
                //'</p>',
                //content block 2
                //'<h4>Subheading</h4>',
                //'<p>',
                //'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus lacinia nisl, et hendrerit enim consequat posuere. Etiam ut interdum nisl, in ultricies arcu. ' +
                //'In mattis ultrices velit, et tristique sem mattis nec. Nullam fermentum quis erat non dapibus. Aenean sodales est at aliquet bibendum. Suspendisse ultricies quam ' +
                //'nec blandit tincidunt. Phasellus viverra est sit amet tortor semper facilisis. Vivamus vitae ipsum lacus. Proin pharetra, tellus in efficitur blandit, tellus nisl ' +
                //'venenatis turpis, ut commodo sapien felis eget quam.',
                //'</p>',
                //'</div>',
                //Optional footer
                '<div class="modal-footer">',
                '<div class="pull-left">',
                '<a class="btn btn-default" ng-click="cancel()">Cancel</a>',
                '</div>',
                '<div class="pull-right">',
                '<a target="_blank" class="btn btn-primary " ng-click="close()">Close</a>',
                '</div>',
                '</div>'
            ].join('');
        }

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    };

    var ContentModalOpenCtrl = ['$scope', '$modalInstance', '$modal', function($scope, $modalInstance, $modal, item) {

        $scope.item = item; // this is the item passed in from the ContentModalCtrl resolve

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }];

}
