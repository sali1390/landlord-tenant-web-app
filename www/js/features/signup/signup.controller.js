angular
  .module('landlordTenant.signup')
  .controller('SignupCtrl', SignupCtrl);

function SignupCtrl($http, $state) {
  var vm = this;

  codeGenerator = function(req, res){
    var min = 10000;
    var max = 99999;
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
  };

  vm.landlordContinue = function(req, res) {


    $http({
      method: 'POST',
      url: '/api/landlords',
      data: {
        firstName: vm.userInfo.firstname,
        lastName: vm.userInfo.lastname,
        email: vm.userInfo.email,
        password: vm.userInfo.password
      }
    }).then(function successCallback(res) {
      sessionStorage.setItem('userEmail', vm.userInfo.email);
      sessionStorage.setItem('userPassword', vm.userInfo.password);

      $state.go("properties", {});
    })
  };

  vm.tenantContinue = function(req, res) {
    $http({
      method: 'POST',
      url: '/api/tenants',
      data: {
        firstName: vm.userInfo.firstname,
        lastName: vm.userInfo.lastname,
        email: vm.userInfo.email,
        password: vm.userInfo.password
      }
    }).then(function successCallback(res) {
      sessionStorage.setItem('userEmail', vm.userInfo.email);
      sessionStorage.setItem('userPassword', vm.userInfo.password);

      $state.go("trequests", {});
    })
  };
}
