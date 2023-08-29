// TABLE: handovers
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Handover = sequelize.define(
    'Handover',
    {
        rental_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        handovered_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        handovered_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        damages: {
            type: DataTypes.JSON,
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