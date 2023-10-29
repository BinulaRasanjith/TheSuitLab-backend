// TABLE FOR PRE DESIGNED COSTUMES
import { DataTypes } from "sequelize";

import sequelize from "../db/db.js";

const PDCostume = sequelize.define(
    'PDCostume',
    {
        itemId: { // GLOBAL ITEM ID
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        name: { // COSTUME NAME
            type: DataTypes.TEXT,
            allowNull: false,
        },
        costumeType: { // 'JACKET' OR 'PANT' 
            type: DataTypes.TEXT,
            allowNull: false,
        },
        size: { // {"L": 3, "M": 1, "S": 3}
            type: DataTypes.JSONB,
            allowNull: false,
        },
        color: { // COLOR OF COSTUME ENTERED BY ASSISTANT
            type: DataTypes.TEXT,
            allowNull: true,
        },
        rentStatus: { // 'AVAILABLE' OR 'UNAVAILABLE'
            type: DataTypes.TEXT,
            allowNull: false,
        },
        images: { // [1.webp, 3.webp, 4.webp, 5.webp]
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
        },
    },
    {
        tableName: 'pre_design_costumes',
    }
);

export default PDCostume;