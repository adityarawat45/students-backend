'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(models.Student, {foreignKey : "rollNo"});
      Answer.belongsTo(models.Question, {foreignKey : "questionId"});
    }
  }
  Answer.init({
    answerId : {
      type : DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },
    questionId : DataTypes.INTEGER,
    rollNo : DataTypes.INTEGER,
    answer: DataTypes.STRING,
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
  },
  
   {
    sequelize,
    paranoid : true,
    timestamps : true,
    modelName: 'Answer',
  });
  return Answer;
};