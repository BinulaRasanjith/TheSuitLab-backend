// TABLE FOR BELTS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Accessory = sequelize.define(
    'Accessory',
    {
        itemId: { // ITEM ID GOT FROM ITEM MODEL
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        brand: { // BRAND NAME
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemName: { // ITEM NAME
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: { // NUMBER OF ITEMS IN THIS ITEM
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        material: { // MATERIAL FROM ASSISTANT INPUT
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: { // COLOR GOT FROM ASSISTANT INPUT
            type: DataTypes.STRING,
            allowNull: false,
        },
        accessoryType: { // 'belt', 'tie' or 'shoe'
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: { // [image1.jpg, image2.jpg, image3.jpg]
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
        },
    },
    {
        tableName: 'accessories',
    }
);

export default Accessory;