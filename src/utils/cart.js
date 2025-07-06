// 장바구니 관련 로컬스토리지 유틸리티 함수들

const CART_STORAGE_KEY = "shopping-cart";

// 장바구니 데이터 가져오기
export const getCartItems = () => {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);

  return cartData ? JSON.parse(cartData) : [];
};

// 장바구니에 상품 추가
export const addToCart = (product) => {
  const cartItems = getCartItems();
  const existingItemIndex = cartItems.findIndex((item) => item.productId === product.productId);

  if (existingItemIndex !== -1) {
    // 이미 장바구니에 있는 상품이면 수량 증가
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // 새로운 상품이면 추가
    cartItems.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

// 장바구니에서 상품 제거
export const removeFromCart = (productId) => {
  try {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
    return updatedItems;
  } catch (error) {
    console.error("장바구니에서 상품을 제거하는 중 오류가 발생했습니다:", error);
    return getCartItems();
  }
};

// 장바구니 수량 변경
export const updateCartQuantity = (productId, quantity) => {
  try {
    const cartItems = getCartItems();
    const itemIndex = cartItems.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      if (quantity <= 0) {
        // 수량이 0 이하면 제거
        return removeFromCart(productId);
      } else {
        cartItems[itemIndex].quantity = quantity;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      }
    }

    return cartItems;
  } catch (error) {
    console.error("장바구니 수량을 변경하는 중 오류가 발생했습니다:", error);
    return getCartItems();
  }
};

// 장바구니 비우기
export const clearCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  } catch (error) {
    console.error("장바구니를 비우는 중 오류가 발생했습니다:", error);
    return [];
  }
};

// 장바구니 총 상품 개수
export const getCartItemCount = () => {
  const cartItems = getCartItems();

  return cartItems.length;
};

// 장바구니 총 금액
export const getCartTotal = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};
