import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Fabric = sequelize.define(
    'Fabric',
    {
        material_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        quantity: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        pattern: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'fabrics',
    }
);

export default Fabric;