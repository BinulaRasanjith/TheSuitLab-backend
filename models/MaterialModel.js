// TABLE FOR MATERIALS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS material_code_seq;`);

const Material = sequelize.define(
    'Material',
    {
        materialCode: { // UNIQUE ID FOR MATERIALS
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'MAT' || LPAD(nextval('material_code_seq')::TEXT, 10, '0')`), // MAT0000000001
        },
        materialType: { // 'Fabric', 'Button', 'Zipper', 'String', 'Interlining'
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        materialName: { // NAME OF THE MATERIAL
            type: DataTypes.STRING,
            allowNull: false,
        },
        supplier: { // SUPPLIER ID BY SELECTING FROM THE SUPPLIER TABLE
            type: DataTypes.TEXT,
            allowNull: false,
        },
        unitPrice: { // PRICE PER UNIT
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        color: { // COLOR OF THE MATERIAL
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        colorCode: { // COLOR CODE OF THE MATERIAL
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        image: { // Material.jpg
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'materials',
    }
);

export default Material;