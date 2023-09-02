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
            type: DataTypes.DOUBLE(12, 2),
            allowNull: true,
        },
        penalties: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
        total: {
            type: DataTypes.DOUBLE(12, 2),
            allowNull: false,
        },
    },
    {
        tableName: 'handovers',
    }
);

export default Handover;