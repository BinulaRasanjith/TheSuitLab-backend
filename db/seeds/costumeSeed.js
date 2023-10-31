import CostumeProgress from "../../constants/CostumeProgress.js";

export default [
  {
    costumeName: "Leather Loafers",
    costumeType: "all",
    customization: {
      fabric: "MAT0000000001",
      button: "4D2",
      lapel: "peak-lapel",
      pocket: "2-straight-flaps-1-ticket",
      sleeveButtons: "4-standard",
      pocketColor: "MAT0000000003",
      buttonColor: "white",
      trouser: "no-vent",
      backPocket: "with-btn",
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
  {
    costumeName: "Leather Loafers",
    costumeType: "all",
    customization: {
      fabric: "MAT0000000001",
      button: "4D2",
      lapel: "peak-lapel",
      pocket: "2-straight-flaps-1-ticket",
      sleeveButtons: "4-standard",
      pocketColor: "MAT0000000003",
      buttonColor: "white",
      trouser: "no-vent",
      backPocket: "with-btn",
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
    progress: CostumeProgress.COLLECTED,
  },
];
