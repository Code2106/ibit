

var express = require('express');
var router = express.Router();
var cachedb = require('../services/cache');

/* Create a property and get to our index.jade add text to h1 tag */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Employee List' });  
});


router.get('/', function(req, res, next) {
  res.send('cache 0.0.1');
});

// Get data from cache:employees in default.json. note: we already by requiring cachedb
// we already have access to config file and default.json where we could access cache and employees data
router.get('/api/employees', function(req, res, next) {
  // call out method from cache to display employee, collect error and result
  cachedb.listEmployees(function(err, results) {
    
    if(err) {
      return;
    }
      res.json(results);
   
  }); 

});

router.post('/api/employees', function (req, res, next) { 

  cachedb.saveEmployee(req.body, function (err, results) {

    if (err) {

        res.send(err + ' Could not save new employee');
        return;
      
    }
 
    res.sendStatus(200);

  });

});

router.delete('/api/employee/:employeeid', function (req, res, next) {
  
  var id = req.params.employeeid;
cachedb.deleteEmployee(id, function (err, results) {
   
  if (err) {
       res.send(err)
       return;
  }
  
      res.send(id);   
    
  });

});

// Edit
router.put('/api/employees/:id', function (req, res, next){
  
  cachedb.editEmployee(req.body, function (err, results) {
    
    if (err) {
       res.send(err);
      return;
   }
    
    res.sendStatus(200);

  });

  res.send(req.body);

});


router.get('/employeeList/:employeeid', function(req, res, next) {
  res.send('cachedb 0.0.1');
});

router.post('/employees', function(req, res, next) {
  res.send('cachedb 0.0.1');
});


module.exports = router;