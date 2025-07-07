import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Toast } from "../../components/layout/Toast";
import { createState, getSearchParams } from "../../utils/store";

import { CategorySection } from "./components/CategorySection";
import { FilterSection } from "./components/FilterSection";
import { ProductSection } from "./components/ProductSection";
import { SearchSection } from "./components/SearchSection";

const MAIN = "MAIN";

export const [getMainState, setMainState] = createState(MAIN, {
  products: [],
  isLoading: true,
  isInfiniteLoading: false,
  total: 0,
  page: 1,
  hasNext: null,
  categories: {},
  toastType: null,
  // 폼 값들을 mainState에 통합
  limit: getSearchParams().get("limit") || "20",
  sort: getSearchParams().get("sort") || "price_asc",
  search: getSearchParams().get("search") || "",
  category1: getSearchParams().get("category1") || "",
  category2: getSearchParams().get("category2") || "",
});

export const MainPage = () => {
  return /* HTML */ `
    <div class="min-h-screen bg-gray-50">
      ${Header()}
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          ${SearchSection()}
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">${CategorySection()}</div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">${FilterSection()}</div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>${ProductSection()}</div>
        </div>
      </main>
      ${Footer()} ${Toast()}
    </div>
  `;
};
