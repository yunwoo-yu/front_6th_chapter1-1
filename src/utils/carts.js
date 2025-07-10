// 🔥 기존 함수명 유지하면서 필요한 기능만 추가

// 장바구니 관련 로컬스토리지 유틸리티 함수들
const CART_STORAGE_KEY = "shopping_cart";

// 기존 함수들 그대로 유지
export const getCartItems = () => {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? JSON.parse(cartData) : [];
};

export const updateCartItems = (cartItems) => {
  const dataString = JSON.stringify(cartItems);
  localStorage.setItem(CART_STORAGE_KEY, dataString);
};

export const addToCart = (product, quantity) => {
  const cartItems = getCartItems();
  const existingItemIndex = cartItems.findIndex((item) => item.productId === product.productId);

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += product.quantity || 1;
  } else {
    cartItems.push({ ...product, quantity: quantity || 1, isSelected: false });
  }

  updateCartItems(cartItems);
};

export const removeCartItem = (productId) => {
  try {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter((item) => item.productId !== productId);
    updateCartItems(updatedItems);
    return updatedItems;
  } catch (error) {
    console.error("장바구니에서 상품을 제거하는 중 오류가 발생했습니다:", error);
    return getCartItems();
  }
};

export const removeSelectedCartItems = () => {
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter((item) => !item.isSelected);
  updateCartItems(updatedItems);
  return updatedItems;
};

export const updateCartQuantity = (productId, type) => {
  try {
    const cartItems = getCartItems();
    const productIndex = cartItems.findIndex((item) => item.productId === productId);

    if (productIndex === -1) {
      return getCartItems();
    }

    if (type === "decrease") {
      if (cartItems[productIndex].quantity > 1) {
        cartItems[productIndex].quantity -= 1;
      }
    } else {
      cartItems[productIndex].quantity += 1;
    }

    updateCartItems(cartItems);
    return cartItems;
  } catch (error) {
    console.error("장바구니 수량을 변경하는 중 오류가 발생했습니다:", error);
    return getCartItems();
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  } catch (error) {
    console.error("장바구니를 비우는 중 오류가 발생했습니다:", error);
    return [];
  }
};

export const getCartItemCount = () => {
  const cartItems = getCartItems();
  return cartItems.length;
};

export const updateCartItemSelection = (productId, isSelected) => {
  try {
    const cartItems = getCartItems();
    const itemIndex = cartItems.findIndex((item) => item.productId === productId);

    if (itemIndex !== -1) {
      cartItems[itemIndex].isSelected = isSelected;
    }

    updateCartItems(cartItems);
    return cartItems;
  } catch (error) {
    console.error("장바구니 선택 상태를 업데이트하는 중 오류가 발생했습니다:", error);
    return getCartItems();
  }
};

export const toggleSelectAll = (isSelected) => {
  try {
    const cartItems = getCartItems();
    const updatedItems = cartItems.map((item) => ({
      ...item,
      isSelected: isSelected,
    }));

    updateCartItems(updatedItems);
    return updatedItems;
  } catch (error) {
    console.error("장바구니 전체 선택을 업데이트하는 중 오류가 발생했습니다:", error);
    return getCartItems();
  }
};

export const getCartTotal = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.lprice * item.quantity, 0);
};
