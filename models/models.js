import Accessory from "./AccessoryModel.js";
import Belt from "./BeltModel.js";
import Buttons from "./ButtonModel.js";
import Cart from "./CartModel.js";
import Costume from "./CostumeModel.js";
import Customer from "./CustomerModel.js";
import Fabric from "./FabricModel.js";
import Handover from "./HandoverModel.js";
import HireCostume from "./HireCostumesModel.js";
import Interlining from "./InterliningModel.js";
import ItemModel from "./ItemModel.js";
import MaterialConsumption from "./MaterialConsumeModel.js";
import Material from "./MaterialModel.js";
import Payment from "./PaymentModel.js";
import PreDesignCostume from "./PreDesignCostumeModel.js";
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
import User from "./UserModel.js";
import Zipper from "./ZipperModel.js";
import PaymentDone from "./PaymentDoneModel.js";
import Notification from "./NotificationModel.js";

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

// PURCHASE_ORDER - PAYMENT RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Payment.hasOne(PurchaseOrder, { foreignKey: 'paymentId', sourceKey: 'invoiceNo', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

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

// CART - ITEM RELATIONSHIP (ONE TO MANY RELATIONSHIP)
ItemModel.hasMany(Cart, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Cart.belongsTo(ItemModel, { foreignKey: 'itemId', targetKey: 'itemId', });

// ACCESSORY - ITEM RELATIONSHIP (ONE TO ONE RELATIONSHIP)
ItemModel.hasOne(Accessory, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });

// HIRED COSTUME - ITEM RELATIONSHIP (ONE TO ONE RELATIONSHIP)
ItemModel.hasOne(HireCostume, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });

// COSTUME - ITEM RELATIONSHIP (ONE TO ONE RELATIONSHIP)
ItemModel.hasOne(Costume, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });

// COSTUME - ITEM RELATIONSHIP (ONE TO ONE RELATIONSHIP)
ItemModel.hasOne(PreDesignCostume, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });

Accessory.hasOne(Belt, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Accessory.hasOne(Shoe, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });
Accessory.hasOne(Tie, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE', });

// PURCHASE_ORDER - ITEM RELATIONSHIP (MANY TO MANY RELATIONSHIP)
ItemModel.belongsToMany(PurchaseOrder, { through: 'purchase_order_items', foreignKey: 'itemId', otherKey: 'orderId' });
PurchaseOrder.belongsToMany(ItemModel, { through: 'purchase_order_items', foreignKey: 'orderId', otherKey: 'itemId' });

// CUSTOMER - RENT RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Customer.hasMany(Rent, { foreignKey: 'customerId', sourceKey: 'userId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
Rent.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId', });
// ! TODO: HAS TO RESTRICT DELETING CUSTOMER IF THERE ARE ANY INCOMPLETED RENTS

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
Material.hasMany(MaterialConsumption, { foreignKey: 'materialCode', sourceKey: 'materialCode', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
MaterialConsumption.belongsTo(Material, { foreignKey: 'materialCode', targetKey: 'materialCode' });

// MATERIAL - SUPPLY_ORDER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Material.hasMany(SupplyOrder, { foreignKey: 'material', sourceKey: 'materialCode', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
SupplyOrder.belongsTo(Material, { foreignKey: 'material', targetKey: 'materialCode' });

// SUPPLY_ORDER - SUPPLIER_PAYMENT RELATIONSHIP (ONE TO MANY RELATIONSHIP)
SupplyOrder.hasMany(SupplierPayment, { foreignKey: 'supplyID', sourceKey: 'supplyID', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });
SupplierPayment.belongsTo(SupplyOrder, { foreignKey: 'supplyID', targetKey: 'supplyID' });

// REVIEW - ITEM RELATIONSHIP (ONE TO MANY RELATIONSHIP)
ItemModel.hasOne(Review, { foreignKey: 'itemId', sourceKey: 'itemId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

// REVIEW - PURCHASE_ORDER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
PurchaseOrder.hasMany(Review, { foreignKey: 'orderId', sourceKey: 'orderId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

// REVIEW - CUSTOMER RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Customer.hasMany(Review, { foreignKey: 'customerId', sourceKey: 'userId', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

// CUSTOMER - NOTIFICATION RELATIONSHIP (ONE TO MANY RELATIONSHIP)
Notification.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId' });

export {
	Accessory,
	Belt,
	Buttons,
	Cart,
	Costume,
	Customer,
	Fabric,
	Handover,
	HireCostume,
	Interlining,
	ItemModel,
	MaterialConsumption,
	Material,
	Payment,
	PreDesignCostume,
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
	User,
	Zipper,
	PaymentDone,
	Notification
};