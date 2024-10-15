'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.hasOne(models.Student, {foreignKey: "addressId"})
    }
  }
  Address.init({
    addressId : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    address : {
      type : DataTypes.STRING, 
      allowNull : false,
    },
    city  : {
      type : DataTypes.STRING, 
      allowNull : false,
    }, 
    state : { 
      type : DataTypes.STRING, 
      allowNull : false,
    },
    pinCode :  {
      type : DataTypes.STRING, 
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'Address',
    paranoid : true
  });
  return Address;
};