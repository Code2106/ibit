
app.directive('employeeInfo', function () { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'employeeInfo.jade' 
  }; 
});
