"use strict";
import { Model } from "sequelize";
import { STATUSES } from "../utility/constant.js";
export default (sequelize, DataTypes) => {
  class organization extends Model {
    static associate(models) {
      this.hasMany(models.project, {
        foreignKey: "organization_id",
        as: "projects",
      });
    }
  }
  organization.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      status: {
        type: DataTypes.ENUM(...STATUSES),
        allowNull: false,
        defaultValue: STATUSES[0],
      },  
    },
    {
      sequelize,
      modelName: "organization",
      paranoid: true,
      underscored: true,
      tableName: "organizations",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return organization;
};
