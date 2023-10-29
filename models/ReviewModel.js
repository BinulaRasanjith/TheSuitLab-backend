// TABLE FOR REVIEWS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS review_code_seq;`);

const Review = sequelize.define(
    'Review',
    {
        reviewId: { // UNIQUE ID FOR REVIEWS
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
            defaultValue: sequelize.literal(`'FD' || LPAD(nextval('review_code_seq')::TEXT, 10, '0')`), // FD0000000001
        },
        customerId: { // CUSTOMER ID FROM THE USER TABLE
            type: DataTypes.TEXT,
            allowNull: false,
        },
        orderId: { // ORDER ID FROM THE ORDER TABLE
            type: DataTypes.TEXT,
            allowNull: false,
        },
        itemId: { // ITEM ID FROM THE ITEM TABLE
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reviewedOn: { // DATE WHEN THE REVIEW IS PLACED
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        rating: { // RATING FROM 1 TO 5
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: { // DESCRIPTION OF THE REVIEW
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'review',
    }
);

export default Review;