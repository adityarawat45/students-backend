'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.Student, {foreignKey : "rollNo"});
      Question.hasMany(models.Answer, {foreignKey : "questionId"});
    }
  }
  Question.init({
    questionId : {
      primaryKey : true,
      type : DataTypes.INTEGER,
      autoIncrement : true
    },
    rollNo : DataTypes.INTEGER,
    question: DataTypes.STRING
  }, {
    sequelize,
    timestamps : true,
    paranoid : true,
    modelName: 'Question',
  });
  return Question;
};