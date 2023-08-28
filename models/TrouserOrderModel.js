import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const TrouserOrder = sequelize.define(
    'TrouserOrder',
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
        tableName: 'trouser_orders',
    }
);

export default TrouserOrder;