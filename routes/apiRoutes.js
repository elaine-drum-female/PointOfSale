var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/drinks", function(req, res) {
    db.drinks.findAll({}).then(function(dbdrinks) {
      console.log(dbdrinks);
      return res.json(dbdrinks);
    });
  });
  app.get("/api/food", function(req, res) {
    db.food.findAll({}).then(function(dbfood) {
      console.log(dbfood);
      return res.json(dbfood);
    });
  });
  app.get("/api/checks", function(req, res) {
    db.checks.findAll({}).then(function(dbchecks) {
      console.log(dbchecks);
      return res.json(dbchecks);
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
};
