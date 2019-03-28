var db = require("../models");

var path = require("path");

module.exports = function(app) {
  // Load Splash page
  app.get("/", function(req, res) {
    //console.log("__dirname=" + __dirname);
    res.sendFile(path.join(__dirname + "/../public/splash.html"));
    /*
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
    */
  });

  // Load Login page
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/login.html"));
    /*
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
    */
  });

  // Load Main page
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/main.html"));
    /*
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
    */
  });

  // Load New Tab page
  app.get("/newtab", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/newtab.html"));
    /*
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
    */
  });

  // Load Tab list page
  app.get("/tablist", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/tablist.html"));
    /*
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
    */
  });

  // Load Tab close page
  app.get("/tabclose", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/tabclose.html"));
    /*
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
    */
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
