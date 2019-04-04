var db = require("../models");

var path = require("path");

module.exports = function(app) {
  // Load Splash page
  app.get("/", function(req, res) {
    //console.log("__dirname=" + __dirname);
    res.sendFile(path.join(__dirname + "/../public/splash.html"));
  });

  // Load Login page
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/login.html"));
  });

  // Load Login failed page
  app.get("/loginf", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/loginf.html"));
  });

  // Load Main page
  app.get("/main", isLoggedIn, function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/main.html"));
  });

  // Load New Tab page
  app.get("/newtab", isLoggedIn, function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/newtab.html"));
  });

  // Load Tab list page
  app.get("/tablist", isLoggedIn, function(req, res, next) {
    //console.log(req.user);
    res.sendFile(path.join(__dirname + "/../public/tablist.html"));
  });

  // Load Tab close page
  app.get("/tabclose", isLoggedIn, function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/tabclose.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  // Ensure users have been authenticate
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
};
