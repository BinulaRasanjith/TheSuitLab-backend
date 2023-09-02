// TABLE FOR REVIEWS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Review = sequelize.define(
    'Review',
    {
        customerId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reviewed_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'review',
    }
);

export default Review;