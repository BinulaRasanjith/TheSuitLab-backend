// TABLE FOR TIES
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Tie = sequelize.define(
    'Tie',
    {
        itemId: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
        },
        Pattern: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        width: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'ties',
    }
);

export default Tie;