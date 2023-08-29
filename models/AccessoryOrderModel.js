// TABLE FOR ACCESSORY ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const AccessoryOrder = sequelize.define(
    'AccessoryOrder',
    {
        order_id: {  // THE WHOLE ORDER ID
            type: DataTypes.INTEGER,
            allowNull: false,
            compositePrimaryKey: true,
        },
        item_id: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.INTEGER,
            allowNull: false,
            compositePrimaryKey: true,
        },
        item_type: {  // THE INDIVIDUAL ITEM TYPE BELT, TIE, ETC
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