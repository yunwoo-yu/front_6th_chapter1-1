import { getProduct } from "../../api/productApi.js";
import { Footer } from "../../components/layout/Footer.js";
import { Header } from "../../components/layout/Header.js";
import { Toast } from "../../components/layout/Toast.js";
import { updateCurrent } from "../../core/renderer.js";
import { Cart } from "../../features/cart/Cart.js";
// import { ProductDetailLoader } from "../../features/products/ProductDetailLoader.js";
import { createState, getRouteParams } from "../../utils/store.js";
import { NavSection } from "./components/NavSection.js";
import { ProductInfoSection } from "./components/ProductInfoSection.js";

// ${ProductDetailLoader()}

const DETAIL = "DETAIL";

export const [getDetailState, setDetailState] = createState(DETAIL, {
  product: null,
  isLoading: true,
});

export const ProductDetailPage = () => {
  const { isLoading } = getDetailState();

  return /* HTML */ `
    <div class="min-h-screen bg-gray-50">
      ${Header({ isBackButton: true, title: "상품 상세" })}
      <main class="max-w-md mx-auto px-4 py-4">
        ${isLoading ? "" : NavSection()} ${isLoading ? "" : ProductInfoSection()}
        <!-- 상품 목록으로 이동 -->
        <div class="mb-6">
          <button
            class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
            hover:bg-gray-200 transition-colors go-to-product-list"
          >
            상품 목록으로 돌아가기
          </button>
        </div>
        <!-- 관련 상품 -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
            <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 gap-3 responsive-grid">
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="86940857379">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img
                    src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg"
                    alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                </h3>
                <p class="text-sm font-bold text-blue-600">230원</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="82094468339">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img
                    src="https://shopping-phinf.pstatic.net/main_8209446/82094468339.4.jpg"
                    alt="실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제
                </h3>
                <p class="text-sm font-bold text-blue-600">280원</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      ${Footer()} ${Cart()} ${Toast()}
    </div>
  `;
};

ProductDetailPage.onMount = async () => {
  const params = getRouteParams();
  const productId = params.id;

  setDetailState({
    product: null,
    isLoading: true,
  });

  const product = await getProduct(productId);

  setDetailState({
    product: product,
    isLoading: false,
  });

  updateCurrent();
};

ProductDetailPage.onUnmount = () => {
  console.log("ProductDetailPage.onUnmount called");
  setDetailState({
    product: null,
    isLoading: true,
  });
};
