'use strict';
module.exports = (sequelize, DataTypes) => {
  const drinks = sequelize.define('drinks', {
    drink_type: DataTypes.STRING,
    drink_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  drinks.associate = function(models) {
    // associations can be defined here
  };
  return drinks;
};