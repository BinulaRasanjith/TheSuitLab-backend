// TABLE FOR TROUSER ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const TrouserOrder = sequelize.define(
    'TrouserOrder',
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
        tableName: 'trouser_orders',
    }
);

export default TrouserOrder;