import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Return = sequelize.define(
    'Return',
    {
        referenceNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderedDate: {
            type: DataTypes.DATE,
        },
        returnDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'returns',
    }
);

export default Return;