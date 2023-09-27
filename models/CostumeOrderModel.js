// TABLE FOR COAT ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const CostumeOrder = sequelize.define(
    'CostumeOrder',
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
    },
    {
        tableName: 'costume_orders',
    }
);

export default CostumeOrder;