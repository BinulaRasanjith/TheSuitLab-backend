// TABLE FOR PURCHASE ORDERS
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

sequelize.query(`CREATE SEQUENCE IF NOT EXISTS order_code_seq;`);

const PurchaseOrder = sequelize.define(
    'PurchaseOrder',
    {
        orderId: { // WHEN PAYMENT IS DONE, THIS WILL BE GENERATED
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: sequelize.literal(`'PO' || LPAD(nextval('order_code_seq')::TEXT, 15, '0')`), // PO000000000000001
        },
        // CUSTOMER ID COMES FROM THE MODEL RELATIONSHIPS
        description: { // TODO: IS THIS NEEDED?
            type: DataTypes.STRING,
            allowNull: true,
        },
        quantity: { // NUMBER OF ITEMS COMES FROM THE CART
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalAmount: { // TOTAL AMOUNT OF THE ORDER
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        paymentMethod: { // 'Cash' OR 'Card'
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        paymentId: { // PAYMENT ID COMES FROM THE PAYMENT MODEL
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: { // TODO: IS THIS NEEDED?
            type: DataTypes.STRING,
            allowNull: true,
        },
        orderedDate: { // DATE WHEN THE ORDER IS PLACED
            type: DataTypes.DATE,
            allowNull: false,
        },
        collectedDate: { // DATE WHEN THE ORDER IS COLLECTED
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'purchase_orders',
    }
);

export default PurchaseOrder;