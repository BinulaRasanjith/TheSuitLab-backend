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

/*
User.hasMany(RefreshToken, { foreignKey: 'userId', sourceKey: 'userId' });
? A SINGLE USER IN `User` TABLE CAN HAVE ONE OR MORE REFRESH TOKENS FROM `RefreshToken` TABLE
RefreshToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });
? A SINGLE REFRESH TOKEN IN `RefreshToken` TABLE BELONGS TO A SINGLE USER IN `User` TABLE
*/

// USER-LOGIN SESSION RELATIONSHIP (ONE TO MANY RELATIONSHIP)
User.hasMany(RefreshToken, { foreignKey: 'userId', sourceKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });

// STAFF-USER AND CUSTOMER RELATIONSHIP
User.hasOne(Customer, { foreignKey: 'userId', sourceKey: 'userId' });
Customer.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });

// STAFF-USER AND USER RELATIONSHIP
User.hasOne(StaffUser, { foreignKey: 'userId', sourceKey: 'userId' });
StaffUser.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });


// CUSTOMER-ORDER RELATIONSHIP
Customer.hasMany(PurchaseOrder, { foreignKey: 'customerId', sourceKey: 'userId', });
PurchaseOrder.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId', });


// ORDER RELATIONSHIPS
PurchaseOrder.hasMany(ShirtOrder, { foreignKey: 'orderId', sourceKey: 'orderId', });
ShirtOrder.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });

PurchaseOrder.hasMany(CoatOrder, { foreignKey: 'orderId', sourceKey: 'orderId', });
CoatOrder.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });

PurchaseOrder.hasMany(TrouserOrder, { foreignKey: 'orderId', sourceKey: 'orderId', });
TrouserOrder.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });

PurchaseOrder.hasMany(AccessoryOrder, { foreignKey: 'orderId', sourceKey: 'orderId', });
AccessoryOrder.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });


// SHIRT-SHIRT_ORDER RELATIONSHIP
ShirtOrder.hasMany(Costume, { foreignKey: 'costumeId', sourceKey: 'costumeId', });
Costume.belongsTo(ShirtOrder, { foreignKey: 'costumeId', targetKey: 'costumeId', });

// COAT-COAT_ORDER RELATIONSHIP
CoatOrder.hasMany(Costume, { foreignKey: 'costumeId', sourceKey: 'costumeId', });
Costume.belongsTo(CoatOrder, { foreignKey: 'costumeId', targetKey: 'costumeId', });

// TROUSER-TROUSER_ORDER RELATIONSHIP
TrouserOrder.hasMany(Costume, { foreignKey: 'costumeId', sourceKey: 'costumeId', });
Costume.belongsTo(TrouserOrder, { foreignKey: 'costumeId', targetKey: 'costumeId', });

// ACCESSORY-ACCESSORY_ORDER RELATIONSHIP
Accessory.hasOne(AccessoryOrder, { foreignKey: 'itemId', sourceKey: 'itemId', });
AccessoryOrder.belongsTo(Accessory, { foreignKey: 'itemId', targetKey: 'itemId', });


// ACCESSORIES RELATIONSHIPS
Accessory.hasOne(Belt, { foreignKey: 'itemId', sourceKey: 'itemId', });
Belt.belongsTo(Accessory, { foreignKey: 'itemId', targetKey: 'itemId', });

Accessory.hasOne(Tie, { foreignKey: 'itemId', sourceKey: 'itemId', });
Tie.belongsTo(Accessory, { foreignKey: 'itemId', targetKey: 'itemId', });

Accessory.hasOne(Shoe, { foreignKey: 'itemId', sourceKey: 'itemId', });
Shoe.belongsTo(Accessory, { foreignKey: 'itemId', targetKey: 'itemId', });


// CUSTOMER-PAYMENT RELATIONSHIP
Customer.hasMany(Payment, { foreignKey: 'customerId', sourceKey: 'userId', });
Payment.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId', });


// PURCHASE_ORDER-PAYMENT RELATIONSHIP
PurchaseOrder.hasMany(Payment, { foreignKey: 'orderId', sourceKey: 'orderId', });
Payment.belongsTo(PurchaseOrder, { foreignKey: 'orderId', targetKey: 'orderId', });


// CUSTOMER-CART RELATIONSHIP
Customer.hasOne(Cart, { foreignKey: 'customerId', sourceKey: 'userId', });
Cart.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'userId', });


// CART-ITEM RELATIONSHIP
Cart.hasMany(Costume, { foreignKey: 'costumeId', sourceKey: 'itemId', });
Costume.belongsTo(Cart, { foreignKey: 'costumeId', targetKey: 'itemId', });



// ? Material - Supplier - ProductManager - SupplyOrder relationships
// ProductManager.hasMany(SupplyOrder, { foreignKey: 'productManagerId', });
// SupplyOrder.belongsTo(ProductManager, { foreignKey: 'productManagerId', });
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