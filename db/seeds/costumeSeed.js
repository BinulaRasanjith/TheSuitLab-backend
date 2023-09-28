
export default [
    {
        costumeName: "Leather Loafers",
        costumeType: "all",
        customization: {
            fabric: "MAT0000000001",
            button: "1S",
            lapel: "peak-lapel",
            pocket: null,
            sleeveButtons: null,
            pocketColor: null,
            buttonColor: "none",
            trouser: "no-vent",
            backPocket: null,
        },
        measurementType: "custom",
        measurements: {
            // { fullShoulderWidth, sleeves, fullChest, waist, hips, frontShoulderWidth, backShoulderWidth, frontJacketLength, neck }
            coatMeasurements: {
                fullShoulderWidth: 16,
                sleeves: 23,
                fullChest: 32,
                waist: 28,
                hips: 32,
                frontShoulderWidth: 16,
                backShoulderWidth: 16,
                frontJacketLength: 16,
                neck: 16,
            },
            // { waist, crotch, thigh, length, cuff }
            trouserMeasurements: {
                waist: 28,
                crotch: 28,
                thigh: 28,
                length: 28,
                cuff: 28,
            },
        },
        quantity: 1,
    },
]