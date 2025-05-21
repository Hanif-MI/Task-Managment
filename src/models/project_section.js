"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class project_section extends Model {
    static associate(models) {
      this.belongsTo(models.project, {
        foreignKey: "project_id",
        as: "project",
      });

      this.belongsTo(models.section, {
        foreignKey: "section_id",
        as: "section",
      });
    }
  }
  project_section.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      project_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "projects",
          key: "id",
        },
      },
      section_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: "sections",
          key: "id",
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "project_section",
      tableName: "project_sections",
      paranoid: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return project_section;
};
