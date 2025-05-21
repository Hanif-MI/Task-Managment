"use strict";
import { Model } from "sequelize";
import { STATUSES } from "../utility/constant.js";
export default (sequelize, DataTypes) => {
  class project extends Model {
    static associate(models) {
      this.belongsTo(models.organization, {
        foreignKey: "organization_id",
        as: "organization",
      });

      this.hasMany(models.task, {
        foreignKey: "project_id",
        as: "tasks",
      });

      this.hasMany(models.project_section, {
        foreignKey: "project_id",
        as: "sections",
      });

      this.hasMany(models.project_member, {
        foreignKey: "project_id",
        as: "members",
      });
    }
  }
  project.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      organization_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "organizations",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      modelName: "project",
      paranoid: true,
      underscored: true,
      tableName: "projects",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return project;
};
