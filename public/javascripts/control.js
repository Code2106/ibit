

angular.module('employeeApp', [])
  .controller('AppController', AppController);


function AppController($scope, $http) {

  // creates an array of employee in scope to be display in view  
  $scope.id;
 
    initialize();

    function initialize() {

      // get data from api
      $http({
        method: 'GET',
        url: '/api/employees'
      }).then(function successCallback(response) {
     
        $scope.employeeList = response.data;
 
      }, function errorCallback(response) {
        console.log('Could not retrieve list of employees');
      });

    }
  
 $scope.saveEmployee = function () {

      var newEmp = {
        id: $scope.employeeList.length,
        name: $scope.name,
        role: $scope.role,
        department: $scope.department
      }
   
      // Check if our fields was filled by the user
      if (employeeValidator(newEmp)) {

        // Now get our api/employees to save the recently added employee
        $http({

          method: 'POST',
          url: '/api/employees',
          data: newEmp

        }).then(function successCallback(response) {

          $scope.employeeList.push(newEmp);
          clearForm();
          console.log('Data sent ' + newEmp.name);
          
        }, function errorCallback(response) {
      
          console.log('Could not send employee');
       
        });
      }
      
    }//eof
  
 $scope.deleteEmployee = function () {
    
   var scopeID = $scope.id;
  
      if (scopeID != null) {

        var id = { id:String($scope.employeeList[scopeID].id) };
        
          $http({

          method: 'DELETE', 
          url: '/api/employee/'+ id.id,
        
          }).then(function successCallback(response) {
        
          $scope.employeeList.splice($scope.id, 1);
          clearForm();
            
          console.log("Removed id "+ id.id);
          console.log(response);

          }, function errorCallback(response) {
    
          console.log('Data remove ' + response.data);
          console.log('scope id' + $scope.id);
        
          });
      }
    }
   
    $scope.editEmployee = function () {
    
      var editEmp = {
        id: $scope.id,// Need to add 1 to view the right numbering on the browser
        name: $scope.name,
        role: $scope.role,
        department: $scope.department
      }

      if ($scope.id != null) {
  
        $http({
      
          method: 'PUT',
          url: '/api/employees/:id',
          data: editEmp

        }).then(function successCallback(response) {
       
          $scope.employeeList[$scope.id] = editEmp;
          console.log($scope.employeeList[$scope.id]);
          clearForm();
          console.log(response);
        
        }, function errorCallback(response) {
      
          console.log('Data Change ' + response);
          
        });
        return;
      }
      console.log('Error no selected item id:' + editEmp.id);

    }
  

    // This will prevent blank fields in our form
    function employeeValidator(param) {

      for (element in param) {
      
        if (param[element] == null) {
          
          return false;
        }
      }
      return true;
    }

   // Support Function
   // Clear Form
    function clearForm() {
      $scope.name = null;
      $scope.role = null;
      $scope.department = null;
    }
  
  // Select Employee from list
  $scope.selectEmployee = function(employee){
    
    $scope.id = $scope.employeeList.indexOf(employee);
    $scope.name = $scope.employeeList[$scope.id].name;
    $scope.role = $scope.employeeList[$scope.id].role;
    $scope.department = $scope.employeeList[$scope.id].department;
    console.log('scope id ' + $scope.id);
    
  }
  
}//end of 1st controller
