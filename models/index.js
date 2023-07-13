import User from "./UserModel.js";
import RefreshToken from "./RefreshTokenModel.js";
import Customer from "./CustomerModel.js";
import StaffUser from "./StaffUserModel.js";
import ProductManager from "./ProductManager.js";
import Tailor from "./TailorModel.js";
import SystemAdmin from "./SystemAdmin.js";
import PurchaseOrder from "./PurchaseOrderModel.js";

// Associations
User.hasOne(RefreshToken, { foreignKey: 'userId' }); // 1:1 relationship
User.hasOne(Customer, { foreignKey: 'id' });
User.hasOne(StaffUser, { foreignKey: 'id' });
StaffUser.hasOne(ProductManager, { foreignKey: 'id' });
StaffUser.hasOne(Tailor, { foreignKey: 'id' });
StaffUser.hasOne(SystemAdmin, { foreignKey: 'id' });
PurchaseOrder.belongsTo(Customer, { foreignKey: 'customer_id', targetKey: 'customer_id' });

export { // for exporting
    User,
    RefreshToken,
    Customer,
    StaffUser,
    PurchaseOrder,
};