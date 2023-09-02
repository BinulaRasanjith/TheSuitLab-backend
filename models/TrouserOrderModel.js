// TABLE FOR TROUSER ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const TrouserOrder = sequelize.define(
    'TrouserOrder',
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
        tableName: 'trouser_orders',
    }
);

export default TrouserOrder;