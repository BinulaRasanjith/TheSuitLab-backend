// TABLE FOR TIES
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Tie = sequelize.define(
    'Tie',
    {
        itemId: {  // THE INDIVIDUAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            PrimaryKey: true,
        },
        Pattern: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        width: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: 'ties',
    }
);

export default Tie;