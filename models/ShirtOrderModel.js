// TABLE FOR SHIRT ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const ShirtOrder = sequelize.define(
    'ShirtOrder',
    {
        costumeId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.TEXT,
            allowNull: false,
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