import { CoatMeasurements, TrouserMeasurements } from "../../models/CustomerModel.js";

export default [
    {
        coatMeasurements: new CoatMeasurements({
            fullShoulderWidth: 20,
            sleeves: 20,
            fullChest: 20,
            waist: 20,
            hips: 20,
            frontShoulderWidth: 20,
            backShoulderWidth: 20,
            frontJacketLength: 20,
            neck: 20,
        }),
        trouserMeasurements: new TrouserMeasurements({
            waist: 20,
            crotch: 20,
            thigh: 20,
            length: 20,
            cuff: 20,
        }),
    },
    {
        coatMeasurements: new CoatMeasurements({
            fullShoulderWidth: 20,

            sleeves: 20,
            fullChest: 20,
            waist: 20,
            hips: 20,
            frontShoulderWidth: 20,
            backShoulderWidth: 20,
            frontJacketLength: 20,
            neck: 20,
        }),
        trouserMeasurements: new TrouserMeasurements({
            waist: 20,
            crotch: 20,
            thigh: 20,
            length: 20,
            cuff: 20,
        }),
    },
]