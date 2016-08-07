
var NodeCache = require('node-cache');
var cache = new NodeCache();
var employees = require('config').get('cache.employees');


var response = [];

// call our method to initialize our cache database
initialize();

//build function to create cache
function initialize() {
  // instantiate an var that would get data from default.json in cache called employees 
  // inside config directory
 
  for(employee in employees) {
    cache.set(employees[employee]["id"], employees[employee]);

  }

}

exports.listEmployees = function (callback) {
  
  //get employees from cache
  var keys = cache.keys();
   //for each element of employees, push it to our array object called response
  keys.forEach(function (key) {
    
  response.push(cache.get(key));
    
  });

  callback(null, response);
  response = [];//clear the array after use
}

exports.saveEmployee = function (employee, callback) {

     //for each elemenof employees, push it to our array object called response
  cache.set(employee.id, employee, function (err, success) {
    
    if (!err && success) {

        //get employees from cache
        response.push(cache.get(employee.id));

    }  
   });
  
  
  callback(null,response);
  response = [];//clear the array after use
 };

exports.deleteEmployee = function (key, callback) {
  
  cache.del(key, function (err, count) {
  
    if (err) {
          
      callback(err);

    }
      
    callback(null, count);
    //response.splice(cache.get(key));
  });

};

exports.editEmployee = function (employee, callback) {
  
  cache.set(employee.id, employee, function (err, success) {
    
    if (!err && success) {

      console.log(success);
      callback(null, success);
      return;
    }
    
    callback(null, err);
  });

};