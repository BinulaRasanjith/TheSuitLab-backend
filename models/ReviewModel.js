// TABLE: review
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Review = sequelize.define(
    'Review',
    {
        customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reviewed_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        rating: { //? check if this actually needs
            type: DataTypes.INTEGER,
        }
    },
    {
        tableName: 'review',
    }
);

export default Review;