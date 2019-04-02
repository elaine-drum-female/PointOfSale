'use strict';
module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define('employee', {
    emp_id: DataTypes.STRING,
    emp_name: DataTypes.STRING,
    hrlyWage: DataTypes.INTEGER,
    jobtitle: DataTypes.STRING
  }, {});
  employee.associate = function(models) {
    // associations can be defined here
  };
  return employee;
};