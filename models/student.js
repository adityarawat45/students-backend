'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // define association here
      Student.hasMany(models.Answer, {foreignKey : 'rollNo'})
      Student.hasMany(models.Question,{foreignKey : 'rollNo'})
      Student.belongsTo(models.Course, {foreignKey : 'courseId'})
      Student.belongsTo(models.Address, {foreignKey : "addressId", onDelete : "CASCADE" })
    }
  }
  Student.init({
    rollNo : {
       type : DataTypes.INTEGER,
       primaryKey : true,
       autoIncrement : true
    },
    firstName: {
      type : DataTypes.STRING,
      allowNull : false
    },
    lastName: {
      type : DataTypes.STRING,
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    phoneNo : {
      type : DataTypes.BIGINT,
      allowNull : false,
      unique : true
    },
    courseId : {
      type : DataTypes.INTEGER,
    },
    addressId : {
      type : DataTypes.INTEGER,
      unique : true
    }
  },
   {
    sequelize,
    modelName: 'Student',
    paranoid : true,
    timestamps : true
  });

  //A trigget that will destroy the address of the student if 
  //the student is destroyed
  // Student.beforeDestroy(async (student,options) => {
  //   const address = await sequelize.models.Address.findOne({
  //     where: { addressId: student.addressId },
  //   });
  //   if (address) {
  //     await address.destroy();
  //   }
  // });

  return Student;
};