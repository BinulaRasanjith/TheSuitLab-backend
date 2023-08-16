import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Return = sequelize.define(
    'Return',
    {
        itemCount: {
            type: DataTypes.INTEGER,
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