// TABLE FOR RETURNS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE IF NOT EXISTS return_code_seq;`);

const Return = sequelize.define(
    'Return',
    {
        returnId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
            defaultValue: sequelize.literal(`'RET' || LPAD(nextval('return_code_seq')::TEXT, 10, '0')`), // RET0000000001
        },
        orderId: { // GET THIS FROM THE ORDER TABLE
            type: DataTypes.TEXT,
            allowNull: false,
        },
        itemId: { // GET THIS FROM THE GLOBAL ITEM TABLE
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        returnedDate: { // DATE WHEN THE RETURN IS PLACED
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        reason: { // REASON FOR RETURN
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: { // 'Fixed' OR 'Pending'
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: 'returns',
    }
);

export default Return;