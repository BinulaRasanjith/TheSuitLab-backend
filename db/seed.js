import dotenv from "dotenv";

import { ASCII } from "../config/config.js";

import {
  User,
  Customer,
  Material,
  Supplier,
  HireCostume,
  Costume,
  Cart,
  PurchaseOrder,
  Payment,
  Review,
  Tie,
  Belt,
  Shoe,
  Accessory,
  PreDesignCostume,
} from "../models/models.js";
import userSeed from "./seeds/userSeed.js";
import supplierSeed from "./seeds/supplierSeed.js";
import materialSeed from "./seeds/materialSeed.js";
import hireCostumesSeed from "./seeds/hireCostumesSeed.js";
import shoeAccessorySeed from "./seeds/shoeAccessorySeed.js";
import beltSeed from "./seeds/beltSeed.js";
import tieAccessorySeed from "./seeds/tieAccessorySeed.js";
import cartSeed from "./seeds/cartSeed.js";
import measurementSeed from "./seeds/measurementSeed.js";
import ItemModel from "../models/ItemModel.js";
import purchaseOrderSeed from "./seeds/purchaseOrderSeed.js";
import costumeSeed from "./seeds/costumeSeed.js";
import paymentSeed from "./seeds/paymentSeed.js";
import reviewSeed from "./seeds/reviewSeed.js";
import ItemType from "../constants/ItemType.js";
import preDesignedItemSeed from "./seeds/preDesignedItemSeed.js";
import { AVAILABLE } from "../constants/constants.js";

dotenv.config();

const defaultPassword = process.env.DEFAULT_PASSWORD;

const seed = async () => {
  try {
    // Admin
    User.findOrCreate({
      where: { mobileNo: userSeed[0].mobileNo },
      defaults: userSeed[0],
    });

    // Operation Assistant
    User.findOrCreate({
      where: { mobileNo: userSeed[2].mobileNo },
      defaults: userSeed[2],
    });

    // Tailor
    User.findOrCreate({
      where: { mobileNo: userSeed[3].mobileNo },
      defaults: userSeed[3],
    });

    // Product Manager
    User.findOrCreate({
      where: { mobileNo: userSeed[4].mobileNo },
      defaults: userSeed[4],
    });

    // Customer - 1
    await User.findOrCreate({
      where: { mobileNo: userSeed[1].mobileNo },
      defaults: userSeed[1],
    });

    const [customer1, created1] = await Customer.findOrCreate({
      where: { userId: userSeed[1].userId },
    });
    customer1.update({
      coatMeasurements: measurementSeed[0].coatMeasurements,
      trouserMeasurements: measurementSeed[0].trouserMeasurements,
    });

    // Customer - 2
    await User.findOrCreate({
      where: { mobileNo: userSeed[5].mobileNo },
      defaults: userSeed[5],
    });

    const [customer2, created2] = await Customer.findOrCreate({
      where: { userId: userSeed[5].userId },
    });
    customer2.update({
      coatMeasurements: measurementSeed[1].coatMeasurements,
      trouserMeasurements: measurementSeed[1].trouserMeasurements,
    });

    // Customer - 3
    await User.findOrCreate({
      where: { mobileNo: userSeed[6].mobileNo },
      defaults: userSeed[6],
    });

    Customer.findOrCreate({ where: { userId: userSeed[6].userId } });

    await Supplier.bulkCreate(supplierSeed);
    await Material.bulkCreate(materialSeed);

    const costumeItems = await costumeSeeding();
    const hireCostumeItems = await hireCostumeSeeding();
    const shoeAccessories = await shoeAccessorySeeding();
    const belts = await beltSeeding();
    const tieAccessories = await tieAccessorySeeding();
    const preDesignedItems = await preDesignedItemSeeding();

    // await Cart.bulkCreate(cartSeed);

    const payment1 = await Payment.create({
      ...paymentSeed[0],
      customerId: customer1.userId,
    });
    const payment2 = await Payment.create({
      ...paymentSeed[1],
      customerId: customer1.userId,
    });
    const payment3 = await Payment.create({
      ...paymentSeed[2],
      customerId: customer1.userId,
    });

    const purchaseOrder1 = await PurchaseOrder.create({
      ...purchaseOrderSeed[0],
      customerId: customer1.userId,
      paymentId: payment1.invoiceNo,
      totalAmount: payment1.amountPaid,
    });
    const purchaseOrder2 = await PurchaseOrder.create({
      ...purchaseOrderSeed[1],
      customerId: customer2.userId,
      paymentId: payment2.invoiceNo,
      totalAmount: payment2.amountPaid,
    });
    const purchaseOrder3 = await PurchaseOrder.create({
      ...purchaseOrderSeed[2],
      customerId: customer1.userId,
      paymentId: payment3.invoiceNo,
      totalAmount: payment3.amountPaid,
    });

    await purchaseOrder1.addItemModels([costumeItems[0]]);
    await purchaseOrder2.addItemModels([costumeItems[1]]);
    await purchaseOrder3.addItemModels([hireCostumeItems[2]]);

    await Review.create({
      ...reviewSeed[0],
      customerId: customer1.userId,
      orderId: purchaseOrder2.orderId,
      itemId: costumeItems[1].itemId,
    });

    console.log(`${ASCII.cyan}Seeding completed${ASCII.reset}\n`);
  } catch (error) {
    console.log(error);
  }
};

async function costumeSeeding() {
  const costumes = [];
  costumeSeed.forEach(async (costume) => {
    const {
      costumeName,
      costumeType,
      customization,
      measurementType,
      measurements,
      quantity,
    } = costume;

    const item = await ItemModel.create({
      itemType: ItemType.CUSTOM_SUIT,
      price: 1000,
      quantity,
    });
    costumes.push(item);

    await Costume.create({
      itemId: item.itemId,
      costumeName,
      costumeType,
      customization,
      measurementType,
      measurements,
      quantity,
    });
  });

  return costumes;
}

async function hireCostumeSeeding() {
  const hireCostumeItems = [];
  for (let i = 0; i < hireCostumesSeed.length; i++) {
    const hireCostume = hireCostumesSeed[i];
    const { itemId, itemType, price, quantity, ...rest } = hireCostume;

    const item = await ItemModel.create({
      itemType,
      price,
      quantity,
    });
    hireCostumeItems.push(item);
    await HireCostume.create({
      itemId: item.itemId,
      ...rest,
    });
  }
  return hireCostumeItems;
}

async function shoeAccessorySeeding() {
  const shoeAccessories = [];
  shoeAccessorySeed.forEach(async (shoeAccessory) => {
    const { itemId, itemType, price, quantity, ...rest } = shoeAccessory;

    const item = await ItemModel.create({
      itemType,
      price,
      quantity,
    });

    shoeAccessories.push(item);
    const { brand, itemName, material, color, accessoryType, image } = rest;
    await Accessory.create({
      itemId: item.itemId,
      brand,
      itemName,
      material,
      color,
      accessoryType,
      image,
      quantity,
    });

    await Shoe.create({
      itemId: item.itemId,
      style: rest.style,
      size: rest.size,
    });
  });
  return shoeAccessories;
}

async function beltSeeding() {
  const belts = [];
  beltSeed.forEach(async (belt) => {
    const { itemId, itemType, price, quantity, ...rest } = belt;

    const item = await ItemModel.create({
      itemType,
      price,
      quantity,
    });

    belts.push(item);

    const { brand, itemName, material, color, accessoryType, image } = rest;
    await Accessory.create({
      itemId: item.itemId,
      brand,
      itemName,
      material,
      color,
      accessoryType,
      image,
      quantity,
    });

    await Belt.create({
      itemId: item.itemId,
      buckleType: rest.buckleType,
      size: rest.size,
    });
  });
  return belts;
}

async function tieAccessorySeeding() {
  const tieAccessories = [];
  tieAccessorySeed.forEach(async (tieAccessory) => {
    const { itemId, itemType, price, quantity, ...rest } = tieAccessory;

    const item = await ItemModel.create({
      itemType,
      price,
      quantity,
    });
    tieAccessories.push(item);

    const { brand, itemName, material, color, accessoryType, image } = rest;
    await Accessory.create({
      itemId: item.itemId,
      brand,
      itemName,
      material,
      color,
      accessoryType,
      image,
      quantity,
    });

    await Tie.create({
      itemId: item.itemId,
      width: rest.width,
      pattern: rest.pattern,
    });
  });
  return tieAccessories;
}

const preDesignedItemSeeding = async () => {
  const preDesignedItems = [];
  preDesignedItemSeed.forEach(async (preDesignedItem) => {
    const { itemId, itemType, price, quantity, ...rest } = preDesignedItem;

    const item = await ItemModel.create({
      itemType,
      price,
      quantity,
    });
    preDesignedItems.push(item);

    await PreDesignCostume.create({
      itemId: item.itemId,
      rentStatus: AVAILABLE,
      ...rest,
    });
  });
  return preDesignedItems;
};

export default seed;
