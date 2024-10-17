'use strict';
const sequelize = require("../models")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await sequelize.transaction();
    try {
      await queryInterface.addColumn('Students', 'phone_number_int', {
        type: Sequelize.BIGINT,
        allowNull: true,
      }, {transaction : t});
  
      await queryInterface.sequelize.query(`
        UPDATE Students
        SET phone_number_int = CASE
          WHEN phoneNo REGEXP '^[0-9]+$' THEN CAST(phoneNo AS SIGNED)
          ELSE NULL
        END
      `, {transaction : t});
  
      await queryInterface.removeColumn('Students', 'phoneNo', {transaction : t});
  
      await queryInterface.renameColumn('Students', 'phone_number_int', 'phoneNo', {transaction : t});
    }
    catch(error) {
      console.log(error);
      await t.rollback()
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'phoneNo', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE Students
      SET phoneNo = CASE
        WHEN phone_number_int IS NOT NULL THEN CAST(phone_number_int AS CHAR)
        ELSE NULL
      END
    `);

    await queryInterface.removeColumn('Students', 'phone_number_int');
  },
};
