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
        Pattern: { // 'Plain', 'Striped', 'Checked', 'Dotted'
            type: DataTypes.STRING,
            allowNull: false,
        },
        width: { // 3.5, 4.0, 4.5 
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'ties',
    }
);

export default Tie;