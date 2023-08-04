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
import Buttons from "./ButtonsModel.js";
import Strings from "./StringsModel.js";
import SupplyOrder from "./SupplyOrderModel.js";
import Supplier from "./SupplierModel.js";
/* 
? relationship between customer rents costumes
? payment too
*/

// User relationships
User.hasMany(RefreshToken, { foreignKey: 'user_id' });
User.hasOne(Customer, { foreignKey: 'id', });
User.hasOne(StaffUser, { foreignKey: 'id', });

// ? StaffUser relationships
StaffUser.hasOne(ProductManager, { foreignKey: 'id' });
StaffUser.hasOne(Tailor, { foreignKey: 'id' });
StaffUser.hasOne(SystemAdmin, { foreignKey: 'id' });

// PurchaseOrder relationships
Customer.hasMany(PurchaseOrder, { foreignKey: 'customer_id', });
PurchaseOrder.hasMany(Costume, { foreignKey: 'order_id', });

// Payment relationships
Customer.hasMany(Payment, { foreignKey: 'customer_id', });
PurchaseOrder.hasMany(Payment, { foreignKey: 'order_id', });

// ? Material - Supplier - ProductManager - SupplyOrder relationships
ProductManager.hasMany(SupplyOrder, { foreignKey: 'product_manager_id', });
SupplyOrder.belongsTo(ProductManager, { foreignKey: 'product_manager_id', });
Supplier.hasMany(SupplyOrder, { foreignKey: 'supplier_id', });
SupplyOrder.belongsTo(Supplier, { foreignKey: 'supplier_id', });
// ? does supply order have many materials? or just one?


// Costume - Material relationship
Costume.hasMany(Material, { foreignKey: 'costume_id', }); // ? problem

// Rent relationships
Customer.hasMany(Rent, { foreignKey: 'customer_id', });
Costume.hasMany(Rent, { foreignKey: 'costume_id', });

// Material type relationships
Material.hasOne(Fabric, { foreignKey: 'material_code', sourceKey: 'material_code' });
Material.hasOne(Buttons, { foreignKey: 'material_code', sourceKey: 'material_code' });
Material.hasOne(Strings, { foreignKey: 'material_code', sourceKey: 'material_code' });

// Review relationships
Customer.hasMany(Review, { foreignKey: 'customer_id', });
Review.belongsTo(Customer, { foreignKey: 'customer_id', });
Costume.hasMany(Review, { foreignKey: 'costume_id', });
Review.belongsTo(Costume, { foreignKey: 'costume_id', });

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