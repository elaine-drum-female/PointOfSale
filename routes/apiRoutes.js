
var passport = require('passport');
var bcrypt = require('bcrypt');
var path = require("path");
LocalStrategy = require('passport-local').Strategy;
var db = require("../models");

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

    /*
    db.employee.findOne({where: { emp_name: username }}).then((user, err) => {
      if (err) { 
        throw err;
      }
      if (!user) {
        return done(null, false);
      }
      if(!bcrypt.compareSync(password.toString(), user.emp_id)) {
        console.log("login failed");
        return done(null, false);
      }
      console.log("login successful"); 
      return done(null, user);
    });
    */
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
    console.log(req.body);
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
          tab_name: req.body.tab_name,
          items_ordered: "",
          sub_total: 0,
          tip: 0,
          total: 0,
          open: req.body.open,
          createdAt: new Date(),
          updatedAt: new Date()
        }).then((dbPost) => { 
          //console.log(dbPost);     
          resp.rc = 0;
          resp.tabId = dbPost.id;
          resp.tabName = dbPost.tab_name;
          resp.message = "Successful.";
          res.json(resp);
        });
  });

  // Authenticate employee
  app.post("/api/authform", 
     passport.authenticate('local', { failureRedirect: '/login',
                                      successRedirect: '/tablist' }));  

  // Authenticate employee
  app.post("/api/auth", function(req, res, next) {
    passport.authenticate('local', { session: true }, function(err, user, info) {
      var resp = {};
      
      if (err) { 
        resp.rc = 1; 
        resp.message = "Login failed. ", err;
        return res.json(resp);
      }

      if (!user) {
        resp.rc = 1; 
        resp.message = "Login failed.";
        return res.json(resp);
      }
      
      resp.rc = 0; 
      resp.serverID = user.id;
      resp.serverName = user.emp_name;
      resp.message = "Login successful.";
      return res.json(resp);
      //return res.redirect('/tablist');
    })(req, res, next);
  });
  
  // Get all tabs
  app.get("/api/gettabs", function(req, res) {
    db.checks.findAll({}).then(function(dbChecks) {
      res.json(dbChecks);
    });
  });
  
  // Get a single tab
  app.get("/api/gettab/:id", function(req, res) {
    db.checks.findOne({where: {id: req.params.id}}).then(function(dbtabs) {
      //console.log(dbtabs);
      return res.json(dbtabs);
    });
  });

  // Get all drink items
  app.get("/api/drinks", function(req, res) {
    db.drinks.findAll({}).then(function(dbdrinks) {
      //console.log(dbdrinks);
      return res.json(dbdrinks);
    });
  });
  
  // Get all food items
  app.get("/api/food", function(req, res) {
    db.food.findAll({}).then(function(dbfood) {
      //console.log(dbfood);
      return res.json(dbfood);
    });
  });

  // Update a tab
  app.put("/api/updatetab/:id", function(req, res) {
    console.log(req.body);
    db.checks.update(req.body,
      { where: { id: req.params.id } }).then(function (results) {
        res.json(results);
      });
  });

  // Close a tab
  app.put("/api/closetab/:id", function(req, res) {
    console.log(req.body);
    db.checks.update(req.body,
      { where: { id: req.params.id } }).then(function (results) {
        res.json(results);
      });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Check if employee is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
  }
};
