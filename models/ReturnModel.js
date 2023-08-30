// TABLE FOR RETURNS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE return_code_seq;`);

const Return = sequelize.define(
    'Return',
    {
        return_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
            defaultValue: sequelize.literal(`'RET' || LPAD(nextval('return_code_seq')::TEXT, 10, '0')`), // RET0000000001
        },
        item_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        order_id: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        returned_date: {
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