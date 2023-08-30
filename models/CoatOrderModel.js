// TABLE FOR COAT ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const CoatOrder = sequelize.define(
    'CoatOrder',
    {
        costume_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        order_id: {
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
        tableName: 'coat_orders',
    }
);

export default CoatOrder;