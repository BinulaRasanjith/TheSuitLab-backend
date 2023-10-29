// TABLE FOR FABRICS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Fabric = sequelize.define(
    'Fabric',
    {
        materialCode: { // MATERIAL ID FROM THE PARENT
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        quantity: { // LENGTH IN YARDS
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        pattern: { // NAME OR DESCRIPTION FOR PATTERN
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'fabrics',
    }
);

export default Fabric;