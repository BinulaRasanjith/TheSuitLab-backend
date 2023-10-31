import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Notification = sequelize.define(
    'Notification',
    {
        userId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        subject: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: 'notifications',
    }
);

export default Notification;