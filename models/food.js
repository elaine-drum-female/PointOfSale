'use strict';
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define('food', {
    food_type: DataTypes.STRING,
    food_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  food.associate = function(models) {
    // associations can be defined here
  };
  return food;
};