"use strict";
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    static associate(models) {
      this.hasMany(models.task_assign, {
        foreignKey: "task_id",
        as: "task_assigns",
      });
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
  task.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "projects",
          key: "id",
        },
      },
      project_section_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "sections",
          key: "id",
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "task",
      tableName: "tasks",
      paranoid: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return task;
};
