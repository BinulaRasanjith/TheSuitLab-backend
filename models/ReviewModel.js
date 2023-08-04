import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Review = sequelize.define(
    'Review',
    {
        description: {
            type: DataTypes.STRING,
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