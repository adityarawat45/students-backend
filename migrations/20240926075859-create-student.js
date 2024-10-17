'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      rollNo : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
      },
      firstName: {
       type : Sequelize.STRING,
       allowNull : false
      },
      lastName: {
       type : Sequelize.STRING,
      },
      email : {
       type : Sequelize.STRING,
       allowNull : false,
       unique : true
      },
      phoneNo : {
       type : Sequelize.STRING,
       allowNull : false,
       unique : true
      },
      courseId : {
       type : Sequelize.INTEGER,
      },
      addressId : {
       type : Sequelize.INTEGER,
       unique : true
      },
      createdAt: {
      allowNull: false,
      type: Sequelize.DATE
      },
      updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
      },
      deletedAt: {
      type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};