import dotenv from "dotenv"
import { ACTIVE, ADMIN, CUSTOMER, OPERATION_ASSISTANT, PRODUCT_MANAGER, TAILOR } from "../../constants/constants.js";

dotenv.config()

const defaultPassword = process.env.DEFAULT_PASSWORD

const userSeed = [
    {
        userId: 'USER0000000001',
        // email: 'admin@email.com',
        mobileNo: '0712345678',
        password: defaultPassword,
        firstName: 'Admin',
        lastName: 'Test',
        role: ADMIN,
        progress: ACTIVE,
        image: 'avatar.png',
    },
    {
        userId: 'USER0000000002',
        // email: 'kavisula@email.com',
        mobileNo: '0773364290',
        password: defaultPassword,
        firstName: 'Kavishka',
        lastName: 'Sulakshana',
        role: CUSTOMER,
        progress: ACTIVE,
        image: 'costume1.jpeg',
    },
    {
        userId: 'USER0000000003',
        // email: 'op_assistant@email.com',
        mobileNo: '0778235998',
        password: defaultPassword,
        firstName: 'Bhanuka',
        lastName: 'Rajakaruna',
        role: OPERATION_ASSISTANT,
        progress: ACTIVE,
        image: 'costume3.jpeg',
    },
    {
        userId: 'USER0000000004',
        // email: 'mamatailor@email.com',
        password: defaultPassword,
        mobileNo: '0753429081',
        firstName: 'John',
        lastName: 'Taylor',
        role: TAILOR,
        progress: ACTIVE,
        image: 'costume2.jpeg',
    },
    {
        userId: 'USER0000000005',
        // email: 'manager@email.com',
        mobileNo: '0773098124',
        password: defaultPassword,
        firstName: 'Viraj',
        lastName: 'Sandakalum',
        role: PRODUCT_MANAGER,
        progress: ACTIVE,
        image: 'costume4.jpeg',
    },

    {
        userId: 'USER0000000006',
        // email: 'sunil@email.com',
        password: defaultPassword,
        mobileNo: '07645902431',
        firstName: 'Sunil',
        lastName: 'Perera',
        role: CUSTOMER,
        progress: ACTIVE,
        image: 'costume1.jpeg',
    },
    {
        userId: 'USER0000000007',
        // email: 'nimal@email.com',
        mobileNo: '0712340991',
        password: defaultPassword,
        firstName: 'Nimal',
        lastName: 'Fernando',
        role: CUSTOMER,
        progress: ACTIVE,
        image: 'costume1.jpeg',
    }
]

export default userSeed;