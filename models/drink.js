'use strict';
module.exports = (sequelize, DataTypes) => {
  const drink = sequelize.define('drink', {
    drink_type: DataTypes.STRING,
    drink_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  drink.associate = function(models) {
    // associations can be defined here
  };
  return drink;
};