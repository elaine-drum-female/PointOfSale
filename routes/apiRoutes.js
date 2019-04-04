
var passport = require('passport');
var bcrypt = require('bcrypt');
var path = require("path");
LocalStrategy = require('passport-local').Strategy;
var db = require("../models");

// Passport local strategy to authenticate a user
passport.use(new LocalStrategy(
  function(username, password, done) {
    //console.log("username=" + username);
    //console.log("password=" + password);
    
    db.employee.findAll({}).then(function(dbUsers) {
      if (dbUsers.length == 0) {
        console.log("No users defined");
        return done(null, false);
      }

      for (var i = 0; i < dbUsers.length; i++) {
        var user = dbUsers[i];
        if(bcrypt.compareSync(password.toString(), user.emp_id)) {
          console.log("login successful!!"); 
          return done(null, user);
        }
      }
      console.log("login failed!!");
      return done(null, false);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  db.employee.findOne({where: {id: id}}).then((user, err) => {
    done(err, user);
  });
});

// Express routes
module.exports = function(app) {  

  // Create a new employee
  app.post('/api/newemployee', function(req, res, next) {
    let hash = bcrypt.hashSync(req.body.emp_id, 10);

    db.employee.create({
        emp_id: hash,
        emp_name: req.body.emp_name,
        hrlyWage: req.body.hrlyWage,
        jobtitle: req.body.jobtitle,
        createdAt: new Date(),
        updatedAt: new Date()
      }).then((dbPost) => {
        res.json({"result": "ok"});
      }); 
  });

  // Create a new tab
  app.post('/api/newtab', function(req, res, next) {

    var resp = {};
 
      db.checks.create({
          employeeId: req.user.id,
          tab_name: req.body.tab_name,
          items_ordered: "",
          sub_total: 0,
          tip: 0,
          total: 0,
          open: req.body.open,
          createdAt: new Date(),
          updatedAt: new Date()
        }).then((dbPost) => {    
          resp.rc = 0;
          resp.tabId = dbPost.id;
          resp.tabName = dbPost.tab_name;
          resp.message = "Successful.";
          res.json(resp);
        });
  });

  // Authenticate employee
  app.post("/api/auth", 
     passport.authenticate('local', { failureRedirect: '/loginf',
                                      successRedirect: '/tablist' }));    
  // Get all tabs
  app.get("/api/gettabs", isLoggedIn, function(req, res) {
    console.log("req.user.id=" + req.user.id);
    db.checks.findAll({where : {employeeId : req.user.id }}).then(function(dbChecks) {
      res.json(dbChecks);
    });
  });
  
  // Get a single tab
  app.get("/api/gettab/:id", function(req, res) {
    db.checks.findOne({where: {id: req.params.id}}).then(function(dbtabs) {
      return res.json(dbtabs);
    });
  });

  // Get all drink items
  app.get("/api/drinks", function(req, res) {
    db.drinks.findAll({}).then(function(dbdrinks) {
      return res.json(dbdrinks);
    });
  });
  
  // Get all food items
  app.get("/api/food", function(req, res) {
    db.food.findAll({}).then(function(dbfood) {
      return res.json(dbfood);
    });
  });

  // Update a tab
  app.put("/api/updatetab/:id", function(req, res) {
    db.checks.update(req.body,
      { where: { id: req.params.id } }).then(function (results) {
        res.json(results);
      });
  });

  // Close a tab
  app.put("/api/closetab/:id", function(req, res) {
    db.checks.update(req.body,
      { where: { id: req.params.id } }).then(function (results) {
        res.json(results);
      });
  });

   // Ensure users have been authenticate
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
  }
};
