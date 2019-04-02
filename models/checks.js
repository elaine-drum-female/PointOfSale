'use strict';
module.exports = (sequelize, DataTypes) => {
  const checks = sequelize.define('checks', {
    tab_name: DataTypes.STRING,
    items_ordered: DataTypes.STRING,
    sub_total: DataTypes.INTEGER,
    tip: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    open: DataTypes.BOOLEAN
  }, {});
  checks.associate = function(models) {
    // associations can be defined here
  };
  return checks;
}; 