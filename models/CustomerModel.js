// TABLE FOR CUSTOMERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Customer = sequelize.define(
    'Customer',
    {
        userId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        coatMeasurements: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        trouserMeasurements: {
            type: DataTypes.JSONB,
            allowNull: true,
        }
    },
    {
        tableName: 'customers',
    }
);

export class CoatMeasurements {
    constructor({ fullShoulderWidth, sleeves, fullChest, waist, hips, frontShoulderWidth, backShoulderWidth, frontJacketLength, neck }) {
        this.fullShoulderWidth = fullShoulderWidth;
        this.sleeves = sleeves;
        this.fullChest = fullChest;
        this.waist = waist;
        this.hips = hips;
        this.frontShoulderWidth = frontShoulderWidth;
        this.backShoulderWidth = backShoulderWidth;
        this.frontJacketLength = frontJacketLength;
        this.neck = neck;
    }

    toJSON() {
        return {
            fullShoulderWidth: this.fullShoulderWidth,
            sleeves: this.sleeves,
            fullChest: this.fullChest,
            waist: this.waist,
            hips: this.hips,
            frontShoulderWidth: this.frontShoulderWidth,
            backShoulderWidth: this.backShoulderWidth,
            frontJacketLength: this.frontJacketLength,
            neck: this.neck,
        }
    }
}

export class TrouserMeasurements {
    constructor({ waist, crotch, thigh, length, cuff }) {
        this.waist = waist;
        this.crotch = crotch;
        this.thigh = thigh;
        this.length = length;
        this.cuff = cuff;
    }

    toJSON() {
        return {
            waist: this.waist,
            crotch: this.crotch,
            thigh: this.thigh,
            length: this.length,
            cuff: this.cuff,
        }
    }
}

export default Customer;