import dotenv from 'dotenv';

import User from "../models/UserModel.js";
import {
    ACTIVE,
    ADMIN, CUSTOMER, TAILOR, OPERATION_ASSISTANT, PRODUCT_MANAGER
} from "../constants/constants.js";

dotenv.config();

const defaultPassword = process.env.DEFAULT_PASSWORD;

const seed = async () => {
    try {
        User.findOrCreate({
            where: { mobileNo: '1234567890' },
            defaults: {
                email: 'admin@email.com',
                password: defaultPassword,
                firstName: 'Admin',
                lastName: 'Test',
                role: ADMIN,
                status: ACTIVE,
            }
        });

        User.findOrCreate({
            where: { mobileNo: '1234567891' },
            defaults: {
                email: 'customer@email.com',
                password: defaultPassword,
                firstName: 'Customer',
                lastName: 'Test',
                role: CUSTOMER,
                status: ACTIVE,
            }
        });

        User.findOrCreate({
            where: { mobileNo: '1234567892' },
            defaults: {
                email: 'tailor@email.com',
                password: defaultPassword,
                firstName: 'Tailor',
                lastName: 'Test',
                role: TAILOR,
                status: ACTIVE,
            }
        });

        User.findOrCreate({
            where: { mobileNo: '1234567893' },
            defaults: {
                email: 'assistant@email.com',
                password: defaultPassword,
                firstName: 'Op-Assistant',
                lastName: 'Test',
                role: OPERATION_ASSISTANT,
                status: ACTIVE,
            }
        });

        User.findOrCreate({
            where: { mobileNo: '1234567894' },
            defaults: {
                email: 'pr_manager@email.com',
                password: defaultPassword,
                firstName: 'Pr-Manager',
                lastName: 'Test',
                role: PRODUCT_MANAGER,
                status: ACTIVE,
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export default seed;