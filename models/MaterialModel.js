// TABLE FOR MATERIALS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE materialCode_seq;`);

const Material = sequelize.define(
    'Material',
    {
        materialCode: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: sequelize.literal(`'MAT' || LPAD(nextval('materialCode_seq')::TEXT, 4, '0')`), // MAT0001
        },
        materialName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.DOUBLE(17, 2),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        colorCode: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'materials',
    }
);

export default Material;