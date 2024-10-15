'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      questionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rollNo : {
        type : Sequelize.INTEGER,
        references : {
          model : 'Students',
          key : 'rollNo'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      question: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};