// TABLE FOR REVIEWS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

// sequelize.query(`CREATE SEQUENCE review_code_seq;`);

const Review = sequelize.define(
    'Review',
    {
        reviewId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            PrimaryKey: true,
            defaultValue: sequelize.literal(`'FD' || LPAD(nextval('review_code_seq')::TEXT, 10, '0')`), // FD0000000001
        },
        customerId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        orderId: { // TODO: CHECK, THIS CAN BE GET FROM `itemId`
            type: DataTypes.TEXT,
            allowNull: false,
        },
        itemId: { // TODO: NO RELATIONSHIP ADDED
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reviewedOn: {
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