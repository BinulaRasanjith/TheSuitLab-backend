import Accessory from "./AccessoryModel.js";
import AccessoryOrder from "./AccessoryOrderModel.js";
import Belt from "./BeltModel.js";
import Buttons from "./ButtonModel.js";
import Cart from "./CartModel.js";
import CostumeOrder from "./CostumeOrderModel.js";
import Costume from "./CostumeModel.js";
import Customer from "./CustomerModel.js";
import Fabric from "./FabricModel.js";
import Handover from "./HandoverModel.js";
import MaterialConsume from "./MaterialConsumeModel.js";
import MaterialConsumption from "./MaterialConsumeModel.js";
import Material from "./MaterialModel.js";
import OTPModel from "./OTPModel.js";
import Payment from "./PaymentModel.js";
import PurchaseOrder from "./PurchaseOrderModel.js";
import RefreshToken from "./RefreshTokenModel.js";
import Rent from "./RentModel.js";
import Return from "./ReturnModel.js";
import Review from "./ReviewModel.js";
import Shoe from "./ShoeModel.js";
import StaffUser from "./StaffUserModel.js";
import Strings from "./StringModel.js";
import Supplier from "./SupplierModel.js";
import SupplierPayment from "./SupplierPaymentModel.js"
import SupplyOrder from "./SupplyOrderModel.js";
import Tie from "./TieModel.js";
import Zipper from "./ZipperModel.js";
import Interlining from "./InterliningModel.js";
import User from "./UserModel.js";
import HireCostume from "./HireCostumesModel.js";

/*
User.hasMany(RefreshToken, { foreignKey: 'userId', sourceKey: 'userId' });
? A SINGLE USER IN `User` TABLE CAN HAVE ONE OR MORE REFRESH TOKENS FROM `RefreshToken` TABLE
RefreshToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });
? A SINGLE REFRESH TOKEN IN `RefreshToken` TABLE BELONGS TO A SINGLE USER IN `User` TABLE
*/

// USER - LOGIN SESSION RELATIONSHIP (ONE TO MANY RELATIONSHIP)
User.hasMany(RefreshToken, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
RefreshToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });

// USER - CUSTOMER RELATIONSHIP (ONE TO ONE RELATIONSHIP)
User.hasOne(Customer, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Customer.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });

// USER - STAFF_USER RELATIONSHIP (ONE TO ONE RELATIONSHIP)
User.hasOne(StaffUser, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
StaffUser.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });


// ACCESSORIES INHERITANCE RELATIONSHIPS (ONE TO ONE RELATIONSHIPS)
Accessory.hasOne(Belt, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Belt.belongsTo(Accessory, { foreignKey: 'itemId', targetKey: 'itemId', });

Accessory.hasOne(Tie, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Tie.belongsTo(Accessory, { foreignKey: 'itemId', targetKey: 'itemId', });

Accessory.hasOne(Shoe, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Shoe.belongsTo(Accessory, { foreignKey: 'itemId', targetKey: 'itemId', });

// ACCESSORY - ACCESSORY_ORDER RELATIONSHIP (ONE TO ONE RELATIONSHIP)
// ? Accessory එකේ PK COLUMN එකෙන් ටිකක් AccessoryOrder එකේ PK COLUMN එකේ තියෙන්න පුලුවන්
// ? හැබැයි AccessoryOrder එකේ PK COLUMN එකේ හැම එකක්ම  Accessory එකේ PK COLUMN එකේ තියෙන්න ඕනේ
Accessory.hasOne(AccessoryOrder, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
AccessoryOrder.belongsTo(Accessory, { foreignKey: 'itemId', targetKey: 'itemId', });

// TODO: ACCESSORY - CART RELATIONSHIP (ONE TO ONE RELATIONSHIP)
// Accessory.hasOne(Cart, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE',});
// Cart.belongsTo(Accessory, { foreignKey: 'itemId', targetKey: 'itemId', });


// PURCHASE_ORDER - ACCESSORY_ORDER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
PurchaseOrder.hasMany(AccessoryOrder, { foreignKey: 'orderId', sourceKey: 'orderId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
AccessoryOrder.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });

// PURCHASE_ORDER - PAYMENT RELATIONSHIP (ONE TO MANY RELATIONSHIP)
PurchaseOrder.hasMany(Payment, { foreignKey: 'orderId', sourceKey: 'orderId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Payment.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });

// PURCHASE_ORDER - COSTUME_ORDER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
PurchaseOrder.hasMany(CostumeOrder, { foreignKey: 'orderId', sourceKey: 'orderId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
CostumeOrder.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });

// TODO: PURCHASE_ORDER - RETURN RELATIONSHIP (ONE TO MANY RELATIONSHIP) ITEM ID RELATIONSHIP
// PurchaseOrder.hasMany(Return, { foreignKey: 'orderId', sourceKey: 'orderId', onDelete: 'CASCADE', onUpdate: 'CASCADE',});
// Return.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });

// TODO: PURCHASE_ORDER - REVIEW RELATIONSHIP (ONE TO MANY RELATIONSHIP) ITEM ID RELATIONSHIP
// PurchaseOrder.hasMany(Review, { foreignKey: 'orderId', sourceKey: 'orderId', onDelete: 'CASCADE', onUpdate: 'CASCADE',});
// Review.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });


// CUSTOMER - PURCHASE_ORDER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Customer.hasMany(PurchaseOrder, { foreignKey: 'customerId', sourceKey: 'userId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
PurchaseOrder.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId', });

// CUSTOMER - REVIEW RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Customer.hasMany(Review, { foreignKey: 'customerId', sourceKey: 'userId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Review.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId', });

// CUSTOMER - PAYMENT RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Customer.hasMany(Payment, { foreignKey: 'customerId', sourceKey: 'userId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Payment.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId', });

// CUSTOMER - CART RELATIONSHIP (ONE TO MANY RELATIONSHIP) ONE CART BUT MANY ITEMS
Customer.hasMany(Cart, { foreignKey: 'customerId', sourceKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Cart.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId', });

// CUSTOMER - RENT RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Customer.hasMany(Rent, { foreignKey: 'customerId', sourceKey: 'userId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Rent.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId', });
// ! TODO: HAS TO RESTRICT DELETING CUSTOMER IF THERE ARE ANY INCOMPLETED RENTS


// COSTUME - COSTUME_ORDER RELATIONSHIP (ONE TO ONE RELATIONSHIP)
Costume.hasOne(CostumeOrder, { foreignKey: 'costumeId', sourceKey: 'costumeId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
CostumeOrder.belongsTo(Costume, { foreignKey: 'costumeId', targetKey: 'costumeId', });

// COSTUME - MATERIAL_CONSUME RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Costume.hasMany(MaterialConsume, { foreignKey: 'costumeId', sourceKey: 'costumeId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
MaterialConsume.belongsTo(Costume, { foreignKey: 'costumeId', targetKey: 'costumeId', });

// COSTUME - HANDOVER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Costume.hasMany(Handover, { foreignKey: 'costumeId', sourceKey: 'costumeId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Handover.belongsTo(Costume, { foreignKey: 'costumeId', targetKey: 'costumeId', });

// TODO: COSTUME - CART RELATIONSHIP (ONE TO ONE RELATIONSHIP)
// Costume.hasOne(Cart, { foreignKey: 'itemId', sourceKey: 'costumeId', onDelete: 'CASCADE', onUpdate: 'CASCADE',});
// Cart.belongsTo(Costume, { foreignKey: 'itemId', targetKey: 'costumeId', });

// COSTUME - RENT RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Costume.hasMany(Rent, { foreignKey: 'costume', sourceKey: 'costumeId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Rent.belongsTo(Costume, { foreignKey: 'costume', targetKey: 'costumeId', });


// RENT - HANDOVER RELATIONSHIP (ONE TO MANY RELATIONSHIP) CAN HAVE MANY HANDOVERS BY COSTUMES
Rent.hasMany(Handover, { foreignKey: 'rentalId', sourceKey: 'rentalId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Handover.belongsTo(Rent, { foreignKey: 'rentalId', targetKey: 'rentalId', });


// STAFF_USER - HANDOVER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
StaffUser.hasMany(Handover, { foreignKey: 'handoveredTo', sourceKey: 'staffId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Handover.belongsTo(StaffUser, { foreignKey: 'handoveredTo', targetKey: 'staffId', });


// SUPPLIER - SUPPLY_ORDER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Supplier.hasMany(SupplyOrder, { foreignKey: 'supplier', sourceKey: 'supplierId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
SupplyOrder.belongsTo(Supplier, { foreignKey: 'supplier', targetKey: 'supplierId', });

// SUPPLIER - MATERIAL RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Supplier.hasMany(Material, { foreignKey: 'supplier', sourceKey: 'supplierId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Material.belongsTo(Supplier, { foreignKey: 'supplier', targetKey: 'supplierId', });

// ? IF REQUIRED: SUPPLIER - SUPPLIER_PAYMENT RELATIONSHIP (ONE TO MANY RELATIONSHIP)
// Supplier.hasMany(SupplierPayment, { foreignKey: 'supplier', sourceKey: 'supplierId', onDelete: 'NO ACTION', onUpdate: 'CASCADE',});
// SupplierPayment.belongsTo(Supplier, { foreignKey: 'supplier', targetKey: 'supplierId', });


// MATERIAL INHERITANCE RELATIONSHIPS (ONE TO ONE RELATIONSHIPS)
Material.hasOne(Fabric, { foreignKey: 'materialCode', sourceKey: 'materialCode', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Fabric.belongsTo(Material, { foreignKey: 'materialCode', targetKey: 'materialCode', });

Material.hasOne(Buttons, { foreignKey: 'materialCode', sourceKey: 'materialCode', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Buttons.belongsTo(Material, { foreignKey: 'materialCode', targetKey: 'materialCode', });

Material.hasOne(Strings, { foreignKey: 'materialCode', sourceKey: 'materialCode', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Strings.belongsTo(Material, { foreignKey: 'materialCode', targetKey: 'materialCode', });

Material.hasOne(Zipper, { foreignKey: 'materialCode', sourceKey: 'materialCode', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Zipper.belongsTo(Material, { foreignKey: 'materialCode', targetKey: 'materialCode', });

Material.hasOne(Interlining, { foreignKey: 'materialCode', sourceKey: 'materialCode', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Interlining.belongsTo(Material, { foreignKey: 'materialCode', targetKey: 'materialCode', });

// MATERIAL - MATERIAL_CONSUME RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Material.hasMany(MaterialConsume, { foreignKey: 'materialCode', sourceKey: 'materialCode', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
MaterialConsume.belongsTo(Material, { foreignKey: 'materialCode', targetKey: 'materialCode' });

// MATERIAL - SUPPLY_ORDER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Material.hasMany(SupplyOrder, { foreignKey: 'material', sourceKey: 'materialCode', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
SupplyOrder.belongsTo(Material, { foreignKey: 'material', targetKey: 'materialCode' });

// SUPPLY_ORDER - SUPPLIER_PAYMENT RELATIONSHIP (ONE TO MANY RELATIONSHIP)
SupplyOrder.hasMany(SupplierPayment, { foreignKey: 'supplyID', sourceKey: 'supplyID', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
SupplierPayment.belongsTo(SupplyOrder, { foreignKey: 'supplyID', targetKey: 'supplyID' });


// CART-COSTUME RELATIONSHIP
// Cart.hasMany(Costume, { foreignKey: 'costumeId', sourceKey: 'itemId', });
// Costume.belongsTo(Cart, { foreignKey: 'costumeId', targetKey: 'itemId', });

// CART-ACCESSORY RELATIONSHIP
// Cart.hasMany(Accessory, { foreignKey: 'itemId', sourceKey: 'itemId', });
// Accessory.belongsTo(Cart, { foreignKey: 'itemId', targetKey: 'itemId', });


export {
	Accessory,
	AccessoryOrder,
	Belt,
	Buttons,
	Cart,
	CostumeOrder,
	Costume,
	Customer,
	Fabric,
	Handover,
	HireCostume,
	MaterialConsumption,
	Material,
	OTPModel,
	Payment,
	PurchaseOrder,
	RefreshToken,
	Rent,
	Return,
	Review,
	Shoe,
	StaffUser,
	Strings,
	Supplier,
	SupplierPayment,
	SupplyOrder,
	Tie,
	Zipper,
	Interlining,
	User,
};