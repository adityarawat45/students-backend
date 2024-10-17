'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     **/
    static associate(models){
       Course.hasMany(models.Student, {foreignKey : "courseId"})
    }
  }
  
  Course.init({
    courseId : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    courseName : {
      type : DataTypes.STRING,
      allowNull : false
    },
    courseFee : {
      type : DataTypes.STRING,
      allowNull : false
    },
    semesters : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Course',
    paranoid : true
  });
  return Course;
};