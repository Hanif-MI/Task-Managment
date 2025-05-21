"use strict";
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class project_member extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "member_id",
        as: "member",
      });
      this.belongsTo(models.project, {
        foreignKey: "project_id",
        as: "project",
      });
    }
  }
  project_member.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      project_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "projects",
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
      modelName: "project_member",
      tableName: "project_members",
      paranoid: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return project_member;
};
