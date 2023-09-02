// TABLE FOR SHOES
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Shoe = sequelize.define(
    'Shoe',
    {
        itemId: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            PrimaryKey: true,
        },
        style: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'shoes',
    }
);

export default Shoe;