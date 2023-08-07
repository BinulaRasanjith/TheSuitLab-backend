import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Fabric = sequelize.define(
    'Fabric',
    {
        materialCode: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        fabricName: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'fabrics',
    }
);

export default Fabric;