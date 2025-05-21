"use strict";
import { Model } from "sequelize";
export default(sequelize, DataTypes) => {
  class task_assign extends Model {
    static associate(models) {
      this.belongsTo(models.task, {
        foreignKey: "task_id",
        as: "task",
      });
      this.belongsTo(models.user, {
        foreignKey: "member_id",
        as: "user",
      });
    }
  }
  task_assign.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      task_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references  : {
          model: "tasks",
          key: "id",
        },
      },
      member_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
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
      modelName: "task_assign",
      tableName: "task_assigns",
      paranoid: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",  
    }
  );
  return task_assign;
};
