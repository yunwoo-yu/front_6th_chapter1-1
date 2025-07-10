import { mainStore } from "../../stores/mainStore";
import { getCartItemCount, getCartItems } from "../../utils/carts";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const mainState = mainStore.getState();

  if (!mainState.isCartOpen) return "";

  const cartItems = getCartItems();
  const cartItemCount = getCartItemCount();

  return /* HTML */ `
    <div
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black bg-opacity-50 z-50 cart-modal-overlay"
    >
      ${!cartItems.length
        ? /* HTML */ ` <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4 cart-modal">
            <div
              class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
              data-modal-content
            >
              <!-- 헤더 -->
              <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                    ></path>
                  </svg>
                  장바구니
                </h2>

                <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <!-- 컨텐츠 -->
              <div class="flex flex-col max-h-[calc(90vh-120px)]">
                <!-- 빈 장바구니 -->
                <div class="flex-1 flex items-center justify-center p-8">
                  <div class="text-center">
                    <div class="text-gray-400 mb-4">
                      <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                        ></path>
                      </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                    <p class="text-gray-600">원하는 상품을 담아보세요!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`
        : /* HTML */ `<div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4 cart-modal">
            <div
              class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
              data-modal-content
            >
              <!-- 헤더 -->
              <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                    ></path>
                  </svg>
                  장바구니
                  <span class="text-sm font-normal text-gray-600 ml-1">${cartItemCount}</span>
                </h2>
                <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <!-- 컨텐츠 -->
              <div class="flex flex-col max-h-[calc(90vh-120px)]">
                <!-- 전체 선택 섹션 -->
                <div class="p-4 border-b border-gray-200 bg-gray-50">
                  <label class="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="cart-modal-select-all-checkbox"
                      ${cartItemCount > 0 && cartItems.every((product) => product.isSelected) ? "checked" : ""}
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    전체선택 (${cartItems.length}개)
                  </label>
                </div>
                <!-- 아이템 목록 -->
                <div class="flex-1 overflow-y-auto">${cartItems.map(CartItem).join("")}</div>
                <!-- 하단 액션 -->
                <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                  <!-- 선택된 아이템 정보 -->
                  <div class="flex justify-between items-center mb-3 text-sm">
                    <span class="text-gray-600"
                      >선택한 상품 (${cartItems.filter((product) => product.isSelected).length}개)</span
                    >
                    <span class="font-medium"
                      >${cartItems
                        .filter((product) => product.isSelected)
                        .reduce((acc, product) => (acc += Number(product.lprice) * product.quantity), 0)
                        .toLocaleString("ko-KR")}원</span
                    >
                  </div>
                  <!-- 총 금액 -->
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-lg font-bold text-gray-900">총 금액</span>
                    <span class="text-xl font-bold text-blue-600"
                      >${cartItems
                        .reduce((acc, product) => (acc += Number(product.lprice) * product.quantity), 0)
                        .toLocaleString("ko-KR")}원</span
                    >
                  </div>
                  <!-- 액션 버튼들 -->
                  <div class="space-y-2">
                    <button
                      id="cart-modal-remove-selected-btn"
                      class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                   hover:bg-red-700 transition-colors text-sm"
                    >
                      선택한 상품 삭제 (${cartItems.filter((product) => product.isSelected).length}개)
                    </button>
                    <div class="flex gap-2">
                      <button
                        id="cart-modal-clear-cart-btn"
                        class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                   hover:bg-gray-700 transition-colors text-sm"
                      >
                        전체 비우기
                      </button>
                      <button
                        id="cart-modal-checkout-btn"
                        class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                   hover:bg-blue-700 transition-colors text-sm"
                      >
                        구매하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`}
    </div>
  `;
};
