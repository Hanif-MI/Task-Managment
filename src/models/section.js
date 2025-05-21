"use strict";
import { Model } from "sequelize";
import { STATUSES } from "../utility/constant.js";
export default (sequelize, DataTypes) => {
  class section extends Model {
    static associate(models) {
      this.hasMany(models.project_section, {
        foreignKey: "section_id",
        as: "project_sections",
      });

      this.hasMany(models.task, {
        foreignKey: "section_id",
        as: "tasks",
      });
    }
  }
  section.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      section_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM(...STATUSES),
        allowNull: false,
        defaultValue: STATUSES[0],
      },
    },
    {
      sequelize,
      modelName: "section",
      tableName: "sections",
      paranoid: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return section;
};
