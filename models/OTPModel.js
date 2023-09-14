import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const OTPModel = sequelize.define(
    "OTP",
    {
        mobileNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
    },
    {
        tableName: "otp",
        timestamps: true
    }
);

export default OTPModel;