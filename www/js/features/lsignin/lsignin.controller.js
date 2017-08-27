angular
  .module('landlordTenant.lsignin')
  .controller('LSigninCtrl', LSigninCtrl);

function LSigninCtrl($http, $state, $anchorScroll) {
  var vm = this;
  vm.userInfo = {};

  vm.continue = function(req, res) {

    sessionStorage.setItem('userEmail', vm.userInfo.email);
    sessionStorage.setItem('userPassword', vm.userInfo.password);

    var userEmail = sessionStorage.getItem('userEmail');
    var userPassword = sessionStorage.getItem('userPassword');

    var userId;

    function checkUser() {
      $http({
        method: 'GET',
        url: '/api/landlords'
      }).then(function successCallback(res) {

        for (i = 0; i < res.data.length; i++) {
          if (res.data[i].email == userEmail && res.data[i].password == userPassword) {
            userId = res.data[i]._id;

            sessionStorage.setItem('propertyId', res.data[i].property_id);
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('isLandlord', res.data[i].landlord);
            sessionStorage.setItem('userName', res.data[i].firstName);

            $state.go("properties");

            return;
          } else {
            $state.go("signup", {id: 'newLandlord'});
          }
        }
      });
    }
    checkUser();
  };

  vm.signup = function() {
    $state.go("signup").then(function() {
      $anchorScroll({id: 'newLandlord'});
    })
  }
}
