// TABLE FOR RETURNS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Return = sequelize.define(
    'Return',
    {
        returnId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
            defaultValue: sequelize.literal(`'RTN' || LPAD(nextval('return_code_seq')::TEXT, 10, '0')`), // RTN0000000001
        },
        orderId: { // TODO: CHECK, THIS CAN BE GET FROM `itemId`
            type: DataTypes.TEXT,
            allowNull: false,
        },
        itemId: { // TODO: NO RELATIONSHIP ADDED
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        returnedDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: 'returns',
    }
);

export default Return;