import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const AccessoryOrder = sequelize.define(
    'AccessoryOrder',
    {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: 'accessory_orders',
    }
);

export default AccessoryOrder;