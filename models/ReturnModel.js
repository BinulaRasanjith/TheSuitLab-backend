import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Return = sequelize.define(
    'Return',
    {
        return_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        returned_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: 'returns',
    }
);

export default Return;