"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.hasMany(models.task_assign, {
        foreignKey: "member_id",
        as: "task_assigns",
      });
      this.hasMany(models.project_member, {
        foreignKey: "member_id",
        as: "project_members",
      });
    }
  }
  user.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      type: {
        type: DataTypes.ENUM("member", "admin"),
        allowNull: false,
        defaultValue: "member",
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
      paranoid: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return user;
};
