// TABLE: coat_orders
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const CoatOrder = sequelize.define(
    'CoatOrder',
    {
        item_id: {
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
        tableName: 'coat_orders',
    }
);

export default CoatOrder;