import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Fabric = sequelize.define(
    'Fabric',
    {
        material_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        fabric_name: {
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