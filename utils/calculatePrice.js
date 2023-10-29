export const calculateFabricAmount = (measurements, unit, costumeType) => {
  // Conversion factors for inch and centimeter
  const inchToCm = 2.54;

  // Convert measurements to a consistent unit (e.g., inch)
  const convertedMeasurements = {};

  for (const [measurement, value] of Object.entries(measurements)) {
    convertedMeasurements[measurement] =
      unit === "inch" ? parseFloat(value) : parseFloat(value) * inchToCm; // Convert to inches if in cm
  }
  //---------------------------------------------------------------------------------------------------

  // Define fabric requirements for each type of costume (in square units)
  const fabricRequirements = {
    jacket: {
      fabricAmount: function (convertedMeasurements) {
        // Example calculation for jacket fabric requirements
        // This is a simplified calculation; replace it with your own logic
        const {
          fullShoulderWidth,
          sleeves,
          fullChest,
          waist,
          hips,
          frontShoulderWidth,
          backShoulderWidth,
          frontJacketLength,
          neck,
        } = convertedMeasurements;

        const totalFabricRequired =
          fullShoulderWidth +
          sleeves +
          frontJacketLength +
          fullChest +
          waist +
          hips +
          frontShoulderWidth +
          backShoulderWidth +
          neck;

        // Return the calculated fabric amount (you may adjust units as needed)
        return totalFabricRequired;
      },
    },
    pant: {
      fabricAmount: function (convertedMeasurements) {
        // Example calculation for pant fabric requirements
        // This is a simplified calculation; replace it with your own logic
        const { waist, crotch, thigh, length, cuff } = convertedMeasurements;

        const totalFabricRequired = waist + crotch + thigh + length + cuff;

        // Return the calculated fabric amount (you may adjust units as needed)
        return totalFabricRequired;
      },
    },
    both: {
      fabricAmount: function (convertedMeasurements) {
        // Calculate fabric requirements for both jacket and pants
        const jacketFabric = fabricRequirements.jacket.fabricAmount(
          convertedMeasurements
        );
        const pantFabric = fabricRequirements.pant.fabricAmount(
          convertedMeasurements
        );

        // Return the combined fabric amount for both costume pieces
        return jacketFabric + pantFabric;
      },
    },
  };

  //----------------------------------------------------------------------------------------------------------

  // Calculate the fabric amount based on the costume type
  const fabricAmount = fabricRequirements[costumeType].fabricAmount(
    convertedMeasurements
  );

  return unit === "inch" ? fabricAmount : fabricAmount / inchToCm; // Convert back to cm if needed
};

export const calculateTotalFabricPrice = (
  unitPriceOfWhole,
  unitPriceOfPocket,
  wholeFabricAmount,
  costumeType
) => {
  // Define fabric prices for each type of costume (in square units)
  let totalFabricPrice = 0;

  if (costumeType === "jacket") {
    totalFabricPrice =
      unitPriceOfWhole * wholeFabricAmount + unitPriceOfPocket * 20;
  } else if (costumeType === "pant") {
    totalFabricPrice =
      unitPriceOfWhole * wholeFabricAmount + unitPriceOfPocket * 20;
  } else if (costumeType === "both") {
    totalFabricPrice =
      unitPriceOfWhole * wholeFabricAmount + unitPriceOfPocket * 30;
  }

  return totalFabricPrice;
};

// // Example usage:
// const measurementsInInches = {
//   FullShoulderWidth: 20,
//   JacketSleevesLength: 24,
//   // Add other measurements in inches
// };

// const measurementsInCm = {
//   FullShoulderWidth: 50,
//   JacketSleevesLength: 60,
//   // Add other measurements in centimeters
// };

// const unitInInches = "inch";
// const unitInCm = "cm";

// const costumeType = "both"; // or 'jacket', 'pant'

// const fabricAmountInInches = calculateFabricAmount(
//   measurementsInInches,
//   unitInInches,
//   costumeType
// );
// console.log(`Fabric Required: ${fabricAmountInInches} square inches`);

// const fabricAmountInCm = calculateFabricAmount(
//   measurementsInCm,
//   unitInCm,
//   costumeType
// );
// console.log(`Fabric Required: ${fabricAmountInCm} square centimeters`);
