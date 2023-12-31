// TABLE FOR SHOES
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Shoe = sequelize.define(
    'Shoe',
    {
        itemId: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
        },
        style: { // 'Oxford', 'Derby', 'Desert', 'Loafer', 'Boat'
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: { // 4-12 FLOAT SIZE
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'shoes',
    }
);

export default Shoe;