'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull : false,
      },
      project_id: {
        type: Sequelize.UUID,
        allowNull : false,
        references: {
          model: 'projects',
          key: 'id',
        },
      },
      section_id: {
        type: Sequelize.UUID,
        allowNull : false,
        references: {
          model: 'sections',
          key: 'id',
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};