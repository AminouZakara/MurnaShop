import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const validateCartSmart = async (cartItems) => {

  

  if (!Array.isArray(cartItems)) {
    throw new TypeError("Cart items is not an array");
  }

  let issues = [];
  let updatedCart = [];

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const itemPrice = parseFloat(item.price);

    const productRef = doc(db, "murnaShoppingPosts", item.id || item.productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      issues.push({
        type: 'removed',
        message: `Product "${item.title || item.name}" is no longer available.`,
      });
      continue;
    }

    const productData = productSnapshot.data();

    // Stock check
    if (productData.quantity < item.quantity) {
      issues.push({
        type: 'stock',
        message: `Only ${productData.quantity} left for "${productData.title || productData.name}". You requested ${item.quantity}.`,
      });
    }

    // Price check
    const productPrice = parseFloat(productData.price);
    if (productPrice !== itemPrice) {
      issues.push({
        type: 'price',
        message: `Price for "${productData.title || productData.name}" changed from ${item.price} to ${productData.price}.`,
      });
    }

    updatedCart.push({
      productOrderStatus: "Pending",
      productId: item.id || item.productId,
      productType: item?.productType || productData?.productType,
      productFor: item?.productFor || productData?.productFor,
      category: item?.category || productData?.category,
      name: productData.title || productData.name,
      price: productData.price,
      color: item.color,
      size: item.size,
      quantity: Math.min(item.quantity, productData.quantity),
      images: productData.images || [],
      description: productData.description || "",
      storeId: productData?.storeId,
      storeName: productData?.storeName,
      storeEmail: productData?.storeEmail,
      storePhoneNumber: productData?.storePhoneNumber,
      storeAddress: productData?.storeAddress,
      storeCity: productData?.storeCity,
    });
  }

  return { issues, updatedCart };
};