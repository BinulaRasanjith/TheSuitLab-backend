// TABLE FOR HANDOVERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Handover = sequelize.define(
    'Handover',
    {
        costumeId: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        handoveredDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        handoveredTo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        damages: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        penalties: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'handovers',
    }
);

export default Handover;