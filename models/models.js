import User from "./UserModel.js";
import RefreshToken from "./RefreshTokenModel.js";
import Customer from "./CustomerModel.js";
import StaffUser from "./StaffUserModel.js";
import ProductManager from "./ProductManager.js";
import Tailor from "./TailorModel.js";
import SystemAdmin from "./SystemAdmin.js";
import PurchaseOrder from "./PurchaseOrderModel.js";
import Review from "./ReviewModel.js";
import Payment from "./PaymentModel.js";
import Rent from "./RentModel.js";
import Costume from "./CostumeModel.js";
import Material from "./MaterialModel.js";
import Fabric from "./FabricModel.js";
import Buttons from "./ButtonModel.js";
import Strings from "./StringModel.js";
import SupplyOrder from "./SupplyOrderModel.js";
import Supplier from "./SupplierModel.js";
import Return from "./ReturnModel.js";
/* 
? relationship between customer rents costumes
? payment too
*/

// User relationships
User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Customer, { foreignKey: 'id', });
Customer.belongsTo(User, { foreignKey: 'id', });

User.hasOne(StaffUser, { foreignKey: 'id', });
StaffUser.belongsTo(User, { foreignKey: 'id', });


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
Customer.hasMany(Payment, { foreignKey: 'customerId', });
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
	User,
	RefreshToken,
	Customer,
	StaffUser,
	PurchaseOrder,
	Review,
	Payment,
	Rent,
	Costume,
	Material,
	Fabric,
	Buttons,
	Strings,
	SupplyOrder,
	Supplier,
	ProductManager,
	Tailor,
	SystemAdmin,
};