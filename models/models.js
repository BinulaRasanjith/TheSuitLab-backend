import Accessory from "./AccessoryModel.js";
import AccessoryOrder from "./AccessoryOrderModel.js";
import Belt from "./BeltModel.js";
import Buttons from "./ButtonModel.js";
import Cart from "./CartModel.js";
import CoatOrder from "./CoatOrderModel.js";
import Costume from "./CostumeModel.js";
import Customer from "./CustomerModel.js";
import Fabric from "./FabricModel.js";
import Handover from "./HandoverModel.js";
import MaterialConsumption from "./MaterialConsumeModel.js";
import Material from "./MaterialModel.js";
import Payment from "./PaymentModel.js";
import PurchaseOrder from "./PurchaseOrderModel.js";
import RefreshToken from "./RefreshTokenModel.js";
import Rent from "./RentModel.js";
import Return from "./ReturnModel.js";
import Review from "./ReviewModel.js";
import ShirtOrder from "./ShirtOrderModel.js"
import Shoe from "./ShoeModel.js";
import StaffUser from "./StaffUserModel.js";
import Strings from "./StringModel.js";
import Supplier from "./SupplierModel.js";
import SupplierPayment from "./SupplierPaymentModel.js"
import SupplyOrder from "./SupplyOrderModel.js";
import Tie from "./TieModel.js";
import TrouserOrder from "./TrouserOrderModel.js";
import User from "./UserModel.js";

import ProductManager from "./ProductManager.js";
import Tailor from "./TailorModel.js";
import SystemAdmin from "./SystemAdmin.js";
/* 
? relationship between customer rents costumes
? payment too
*/

// User relationships
User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

// STAFF-USER AND CUSTOMER RELATIONSHIP
User.hasOne(Customer, { foreignKey: 'user_id', });
Customer.belongsTo(User, { foreignKey: 'user_id', });

// STAFF-USER AND USER RELATIONSHIP
User.hasOne(StaffUser, { foreignKey: 'user_id', });
StaffUser.belongsTo(User, { foreignKey: 'user_id', });
// StaffUser.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });


// StaffUser relationships
StaffUser.hasOne(ProductManager, { foreignKey: 'id' });
ProductManager.belongsTo(StaffUser, { foreignKey: 'id' });

StaffUser.hasOne(Tailor, { foreignKey: 'id' });
Tailor.belongsTo(StaffUser, { foreignKey: 'id' });

StaffUser.hasOne(SystemAdmin, { foreignKey: 'id' });
SystemAdmin.belongsTo(StaffUser, { foreignKey: 'id' });


// PurchaseOrder relationships
Customer.hasMany(PurchaseOrder, { foreignKey: 'customerId', });
PurchaseOrder.hasMany(Costume, { foreignKey: 'orderId', });
// Return.belongsTo(PurchaseOrder, { foreignKey: 'referenceNo' });


// Payment relationships
Customer.hasMany(Payment, { foreignKey: 'user_id', });
PurchaseOrder.hasMany(Payment, { foreignKey: 'orderId', });


// ? Material - Supplier - ProductManager - SupplyOrder relationships
ProductManager.hasMany(SupplyOrder, { foreignKey: 'productManagerId', });
SupplyOrder.belongsTo(ProductManager, { foreignKey: 'productManagerId', });
Supplier.hasMany(SupplyOrder, { foreignKey: 'supplierId', });
SupplyOrder.belongsTo(Supplier, { foreignKey: 'supplierId', });
// ? does supply order have many materials? or just one?


// Costume - Material relationship
Costume.hasMany(Material, { foreignKey: 'costumeId', }); // ? problem


// Rent relationships
Customer.hasMany(Rent, { foreignKey: 'customerId', });
Costume.hasMany(Rent, { foreignKey: 'costumeId', });


// Material type relationships
Material.hasOne(Fabric, { foreignKey: 'materialCode', sourceKey: 'materialCode' });
Material.hasOne(Buttons, { foreignKey: 'materialCode', sourceKey: 'materialCode' });
Material.hasOne(Strings, { foreignKey: 'materialCode', sourceKey: 'materialCode' });


// Review relationships
Customer.hasMany(Review, { foreignKey: 'customerId', });
Review.belongsTo(Customer, { foreignKey: 'customerId', });
Costume.hasMany(Review, { foreignKey: 'costumeId', });
Review.belongsTo(Costume, { foreignKey: 'costumeId', });


export {
	Accessory,
	AccessoryOrder,
	Belt,
	Buttons,
	Cart,
	CoatOrder,
	Costume,
	Customer,
	Fabric,
	Handover,
	MaterialConsumption,
	Material,
	Payment,
	PurchaseOrder,
	RefreshToken,
	Rent,
	Return,
	Review,
	ShirtOrder,
	Shoe,
	StaffUser,
	Strings,
	Supplier,
	SupplierPayment,
	SupplyOrder,
	Tie,
	TrouserOrder,
	User,
};