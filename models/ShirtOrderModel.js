import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const ShirtOrder = sequelize.define(
    'ShirtOrder',
    {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        customization: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        measurements: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        tableName: 'shirt_orders',
    }
);

export default ShirtOrder;