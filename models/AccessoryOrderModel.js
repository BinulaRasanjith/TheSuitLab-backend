// TABLE FOR ACCESSORY ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const AccessoryOrder = sequelize.define(
    'AccessoryOrder',
    {
        orderId: {  // THE WHOLE ORDER ID
            type: DataTypes.TEXT,
            allowNull: false,
            compositePrimaryKey: true,
        },
        itemId: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            compositePrimaryKey: true,
        },
        itemType: {  // THE INDIVIDUAL ITEM TYPE BELT, TIE, ETC
            type: DataTypes.STRING(10),
            allowNull: false,
            compositePrimaryKey: true,
        },
    },
    {
        tableName: 'accessory_orders',
    }
);

export default AccessoryOrder;