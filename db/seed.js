import dotenv from 'dotenv';

import { ASCII } from '../config/config.js';

import {
    User,
    Customer,
    Material,
    Supplier,
    HireCostume,
    Cart,
    PurchaseOrder,
} from "../models/models.js";
import userSeed from './seeds/userSeed.js';
import supplierSeed from './seeds/supplierSeed.js';
import materialSeed from './seeds/materialSeed.js';
import hireCostumesSeed from './seeds/hireCostumesSeed.js';
import cartSeed from './seeds/cartSeed.js';
import measurementSeed from './seeds/measurementSeed.js';
import ItemModel from '../models/ItemModel.js';
import purchaseOrderSeed from './seeds/purchaseOrderSeed.js';

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

        const [customer1, created1] = await Customer.findOrCreate({ where: { userId: userSeed[1].userId } });
        customer1.update({
            coatMeasurements: measurementSeed[0].coatMeasurements,
            trouserMeasurements: measurementSeed[0].trouserMeasurements,
        })


        // Customer - 2
        await User.findOrCreate({
            where: { mobileNo: userSeed[5].mobileNo },
            defaults: userSeed[5],
        });

        const [customer2, created2] = await Customer.findOrCreate({ where: { userId: userSeed[5].userId } });
        customer2.update({
            coatMeasurements: measurementSeed[1].coatMeasurements,
            trouserMeasurements: measurementSeed[1].trouserMeasurements,
        })


        // Customer - 3
        await User.findOrCreate({
            where: { mobileNo: userSeed[6].mobileNo },
            defaults: userSeed[6],
        });

        Customer.findOrCreate({ where: { userId: userSeed[6].userId } });

        await Supplier.bulkCreate(supplierSeed);
        await Material.bulkCreate(materialSeed);

        const items = []
        for (let i = 0; i < hireCostumesSeed.length; i++) {
            const hireCostume = hireCostumesSeed[i];
            const { itemId, itemType, price, quantity, ...rest } = hireCostume;

            const item = await ItemModel.create({
                itemType,
                price,
                quantity,
            });
            items.push(item)
            await HireCostume.create({
                itemId: item.itemId,
                ...rest,
            });
        }

        const purchaseOrder1 = await PurchaseOrder.create({ ...purchaseOrderSeed[0], customerId: customer1.userId });
        const purchaseOrder2 = await PurchaseOrder.create({ ...purchaseOrderSeed[1], customerId: customer2.userId });
        const purchaseOrder3 = await PurchaseOrder.create({ ...purchaseOrderSeed[2], customerId: customer1.userId });

        await purchaseOrder1.addItemModels([items[0], items[1], items[2]]);
        await purchaseOrder2.addItemModels([items[1]]);
        await purchaseOrder3.addItemModels([items[2]]);

        console.log(`${ASCII.cyan}Seeding completed${ASCII.reset}\n`);
    } catch (error) {
        console.log(error);
    }
}

export default seed;