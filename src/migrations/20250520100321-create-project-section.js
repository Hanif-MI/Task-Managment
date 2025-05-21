"use strict";
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("project_sections", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      project_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "projects",
          key: "id",
        },
      },
      section_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "sections",
          key: "id",
        },
        unique: true,
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
    await queryInterface.dropTable("project_sections");
  },
};
