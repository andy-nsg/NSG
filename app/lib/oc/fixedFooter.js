angular.module('OrderCloud-FixedFooter', []);

angular
  .module('OrderCloud-FixedFooter')
  .directive('fixedfooter', fixedfooter)
  // .directive('orderbuttons', orderbuttons)
  .controller('FixedFooterCtrl', FixedFooterCtrl);

function fixedfooter() {
  var directive = {
    restrict: 'E',
    template: template,
    controller: 'FixedFooterCtrl'
  };
  return directive;

  function template() {
    return [
      '<style>',
      'body {margin-bottom:0;}',
      '.footFoot {margin-top:400px;}',
      //'.fixed-footer-bottom .pull-left a {font-size:2em; margin-right:0.5em;}',
      '.copyright-view {margin:0; padding-bottom:150px !important;}',
      //'@media (max-width:767px) { .copyright-view {height: 300px !important; margin-top:25px; padding-top:0;} }',
      '</style>',
      // Single responsive block (no more separate xs/xxs duplicate markup - base.css handles the
      // mobile stack via a media query). No <footer> wrapper here: the parent shell already wraps
      // <fixedfooter> in <footer role="contentinfo">, so a second <footer> here just creates a
      // redundant/confusing nested landmark for screen reader users.
      '<div class="footFoot">',
      '<div class="NSGfooter">',
      '<div class="footLeft">',
      '<a href="https://ibvi.org/" target="_blank" rel="noopener" aria-label="Visit the Industries for the Blind and Visually Impaired website">',
      '<img src="https://www.four51.com/Themes/Custom/bf16eda1-bed2-459f-93f6-26f079f9c976/NSG/images/NSG-IBVI-AB1-100H.png" alt="Images of National Service Gear, Industries for the Blind and Visually Impaired,and AbilityOne logos. Text below logos: National Service Gear is a registered trademark and global brand of Industries for the Blind and Visually Impaired, Inc., and is an authorized AbilityOne provider." width="100%" />',
      '</a>',
      '</div>',
      '<div class="footRight">',
      '<p>Contact Customer Service</p>',
      '<p><i class="fa-regular fa-clock" aria-hidden="true"></i>  M-F 8a-4:30p ET</p>',
      '<p><i class="fa-solid fa-phone" aria-hidden="true"></i>  1.855.444.0847</p>',
      '<p><i class="fa-solid fa-envelope" aria-hidden="true"></i>  <a href="mailto:service@nationalservicegear.org?subject=NSG%20Contact">service@nationalservicegear.org</a></p>',
      '</div>',
      '</div>',
      '<div class="socialFooter">',
      '<p class="text-left">',
      '<a class="vertIcon iconTrans iconTwitter" target="_blank" rel="noopener" href="https://x.com/servicegear" aria-label="National Service Gear on X"><i class="fa-brands fa-x-twitter fa-3x" aria-hidden="true"></i></a>',
      '<a class="vertIcon iconTrans iconFacebook" target="_blank" rel="noopener" href="https://www.facebook.com/NationalServiceGear" aria-label="National Service Gear on Facebook"><i class="fa-brands fa-facebook-square fa-3x" aria-hidden="true"></i></a>',
      '<a class="vertIcon iconTrans iconInstagram" target="_blank" rel="noopener" href="https://www.instagram.com/nationalservicegear" aria-label="National Service Gear on Instagram"><i class="fa-brands fa-instagram fa-3x" aria-hidden="true"></i></a>',
      '</p>',
      '</div>',
      '</div>'
    ].join('');
  }
}

FixedFooterCtrl.$inject = ['$scope', '$location'];

function FixedFooterCtrl($scope, $location) {
  var d = new Date();
  $scope.year = d.getFullYear();

  // Check if the current path is active
  $scope.isActive = function(path) {
    var cur_path = $location.path().replace('/', '');
    if (Array.isArray(path)) {
      return path.includes(cur_path);
    }
    return cur_path === path;
  };

  // Check if the current path contains the given path
  $scope.isInPath = function(path) {
    var cur_path = $location.path().replace('/', '');
    return cur_path.indexOf(path) > -1;
  };
}