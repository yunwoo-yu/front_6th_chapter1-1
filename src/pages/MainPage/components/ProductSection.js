import { ProductItem } from "../../../features/products/ProductItem";
import { ProductItemSkeleton } from "../../../features/products/ProductItemSkeleton";

export const ProductSection = ({ products, isLoading, total }) => {
  return /* HTML */ `
    <!-- 상품 개수 정보 -->
    ${isLoading
      ? ""
      : /* HTML */ `
          <div class="mb-4 text-sm text-gray-600">
            총 <span class="font-medium text-gray-900">${total}개</span>의 상품
          </div>
        `}
    <!-- 상품 그리드 -->
    <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
      <!-- 로딩 스켈레톤 -->
      ${isLoading
        ? Array.from({ length: 4 }).map(ProductItemSkeleton).join("")
        : products.map((product) => ProductItem(product)).join("")}
    </div>
  `;
};
